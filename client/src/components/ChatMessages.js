import { Input } from '@vechaiui/react';
import React, { useEffect, useState } from 'react'
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import callApi from '../apiCalls';
import openNotificationWithIcon from './Notification'
import formatTime from '../helpers/formatTime'
function ChatMessages() {
    // const dispatch = useDispatch();
    const [chatsLoading, setChatsLoading] = useState(false);
    const [messages, setAllMessages] = useState([]);
    const { currSelectedChat } = useSelector(state => state.chats);
    useEffect(() => {
        (async function name(currSelectedChat) {
            try {
                setChatsLoading(true);
                const { messages } = await callApi.apiMethod('getMessagesOfChat', 'GET', null, `/${currSelectedChat._id}`);
                setAllMessages(messages);
                setChatsLoading(false);
            } catch (error) {
                openNotificationWithIcon('error', error.message)
            }
        })(currSelectedChat);
    }, [currSelectedChat]);
    if (chatsLoading) return <h1>Loading...</h1>
    return (
        <>
            <div className="chatMessages">
                <div className="chatMessages__message">
                    {
                        messages.map((message, index) => {
                            return (
                                <div key={index} className="chatMessages__message__item__content">
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
            <div className="footerWriteNewMessage">
                <div className="footerWriteNewMessage__input">
                    <Input type="text" placeholder="Write new message" />
                </div>
                <div className="footerWriteNewMessage__send">
                    <MdSend />
                </div>
            </div>
        </>
    )
}

export default ChatMessages