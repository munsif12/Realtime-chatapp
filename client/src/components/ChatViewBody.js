import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import callApi from '../apiCalls';
import openNotificationWithIcon from './Notification'
import formatTime from '../helpers/formatTime'
import chatbackgroundimage from '../assets/images/whatsapp-chat-background-image-lighter.jpg'
function ChatViewBody() {
    // const dispatch = useDispatch();
    const [chatsLoading, setChatsLoading] = useState(false);
    const [messages, setAllMessages] = useState([]);
    const {
        auth: { user: loggedInUser },
        chats: { currSelectedChat } } = useSelector(state => state);
    useEffect(() => {
        (async function name(currSelectedChat) {
            try {
                setChatsLoading(true);
                const { messages } = await callApi.apiMethod('getMessagesOfChat', 'GET', null, `/${currSelectedChat._id}`);
                console.log('messages', messages);
                setAllMessages(messages);
                setChatsLoading(false);
            } catch (error) {
                setChatsLoading(false);
                openNotificationWithIcon('error', error.message)
            }
        })(currSelectedChat);
    }, [currSelectedChat]);
    return (
        <main className="chatViewBody"
            style={{ backgroundImage: `url(${chatbackgroundimage})`, width: "100%" }}>
            {chatsLoading && <div className="loader">Loading...</div>}
            <div className="chatMessages">
                <div className="chatMessages__message">
                    {
                        messages.map((message, index) => {
                            return (
                                <div key={index}
                                    className="chatMessages__message__item__content"
                                    style={
                                        loggedInUser._id === message.senderId._id ?
                                            { backgroundColor: "#d9fdd3", color: "#000", alignSelf: "end" } :
                                            { backgroundColor: "#fff", color: "#000" }}
                                >
                                    <div className="chatMessages__message__item__content__text">
                                        {message.message}
                                    </div>
                                    <div className="chatMessages__message__item__content__time">
                                        {formatTime(message.createdAt)}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}

export default ChatViewBody