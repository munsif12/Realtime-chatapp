import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import callApi from '../apiCalls';
import openNotificationWithIcon from './Notification'
import InputEmoji from 'react-input-emoji'
import chatbackgroundimage from '../assets/images/whatsapp-chat-background-image-lighter.jpg'

// import React from 'react'
import { MdSend } from "react-icons/md";
import { setLatestMessageForOneToOneChat } from '../redux/slices/chats';
import ChatMessage from './ChatMessage';
import ChatsLoading from './ChatsLoading';
function ChatViewBody() {
    const dispatch = useDispatch();
    const [allMessages, setAllMessages] = useState([]);
    const [chatsLoading, setChatsLoading] = useState(false);

    //form state
    const [newMessage, setNewMessage] = useState('');
    const [newMessageLoading, setnewMessageLoading] = useState(false);
    const inputRef = useRef(null)
    const {
        auth: { user: loggedInUser },
        chats: { currSelectedChat }
    } = useSelector(state => state);


    useEffect(() => {
        (async function fetchMessages(currSelectedChat) {
            try {
                if (Object.keys(currSelectedChat).length < 1) return
                setChatsLoading(true);
                const data = await callApi.apiMethod('getMessagesOfChat', 'GET', null, `/${currSelectedChat._id}`);
                if (data.error) {
                    throw data
                }
                setAllMessages(data.messages);
                setChatsLoading(false);
            } catch (error) {
                const { error: backendError } = error
                setChatsLoading(false);
                openNotificationWithIcon('error', backendError.message)
            }
        })(currSelectedChat);
    }, [currSelectedChat]);

    useEffect(() => {
        inputRef?.current?.focus();
        return () => {
            console.log('ChatViewBody :: unmounting')
        }
    }, [currSelectedChat]);

    function enterHandler(event) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            sendNewMessage();
        }
    }
    async function sendNewMessage() {
        try {
            if (newMessageLoading) return
            if (newMessage.trim() === '') {
                openNotificationWithIcon('error', 'Please enter a message');
                return;
            }
            const body = {
                chatId: currSelectedChat._id,
                senderId: loggedInUser._id,
                recieverId: currSelectedChat.users[0]._id,
                message: newMessage
            }
            setnewMessageLoading(true);
            setNewMessage('')
            const data = await callApi.apiMethod('sendNewMessage', 'POST', body, null);
            if (data.error) {
                throw data
            }
            setAllMessages(prevMessages => {
                return [...prevMessages, data.message]
            });
            dispatch(setLatestMessageForOneToOneChat({ chatId: currSelectedChat._id, message: data.message }));
            setnewMessageLoading(false);
        } catch (error) {
            const { error: backendError } = error
            setnewMessageLoading(false);
            openNotificationWithIcon('error', backendError.message)
        }
    }

    return (
        <>
            <main className="chatViewBody"
                style={{ backgroundImage: `url(${chatbackgroundimage})`, width: "100%" }}>
                {/* {chatsLoading && <ChatsLoading noOfSkeletons={10} />} */}
                < div className="chatMessages">
                    <div className="chatMessages__message">
                        {
                            allMessages.map((message, index) => <ChatMessage
                                key={index}
                                message={message}
                                loggedInUser={loggedInUser}
                                isGroupChat={currSelectedChat.isGroupChat}
                                setAllMessages={setAllMessages}
                                allMessages={allMessages}
                            />)
                        }
                    </div>
                </div>
            </main>
            <div className="footerWriteNewMessage">
                <div className="footerWriteNewMessage__input">
                    <InputEmoji
                        ref={inputRef}
                        type="text"
                        placeholder={newMessageLoading ? "Sending..." : "Write new message"}
                        value={newMessage}
                        onChange={setNewMessage}
                        onKeyDown={enterHandler}
                        borderRadius={8}
                    />
                </div>
                <div className="footerWriteNewMessage__send">
                    <MdSend onClick={sendNewMessage} />
                </div>
            </div>
        </>
    )
}

export default ChatViewBody