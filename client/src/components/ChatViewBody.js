import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import callApi from '../apiCalls';
import openNotificationWithIcon from './Notification'
import formatTime from '../helpers/formatTime'
import chatbackgroundimage from '../assets/images/whatsapp-chat-background-image-lighter.jpg'

// import React from 'react'
import { Input } from '@vechaiui/react'
import { MdSend } from "react-icons/md";
import { setLatestMessageForOneToOneChat } from '../redux/slices/chats';
import ChatMessage from './ChatMessage';
function ChatViewBody() {
    const dispatch = useDispatch();
    const [messages, setAllMessages] = useState([]);
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
    const StyleButton = (loggedInUser, message) => {

        let style = { color: "#000" }
        if (currSelectedChat.isGroupChat && loggedInUser._id !== message.senderId._id) {
            style.paddingTop = "25px";
        }
        if (loggedInUser._id === message.senderId._id) {
            style.backgroundColor = "#d9fdd3";
            style.alignSelf = "end"
        }
        if (loggedInUser._id !== message.senderId._id) {
            style.backgroundColor = "#fff"
        }
        return style;
    };

    return (
        <>
            <main className="chatViewBody"
                style={{ backgroundImage: `url(${chatbackgroundimage})`, width: "100%" }}>
                {chatsLoading && <div className="loader">Loading...</div>}
                <div className="chatMessages">
                    <div className="chatMessages__message">
                        {
                            messages.map((message, index) => <ChatMessage key={index} message={message} loggedInUser={loggedInUser} isGroupChat={currSelectedChat.isGroupChat} />)
                        }
                    </div>
                </div>
            </main>
            <div className="footerWriteNewMessage">
                <div className="footerWriteNewMessage__input">
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder={newMessageLoading ? "Sending..." : "Write new message"}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={enterHandler}
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