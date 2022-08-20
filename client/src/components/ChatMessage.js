import React from 'react'
import formatTime from '../helpers/formatTime'

const StyleButton = (loggedInUser, message, isGroupChat) => {
    let style = { color: "#000" }
    if (isGroupChat && loggedInUser._id !== message.senderId._id) {
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

function ChatMessage({ message, loggedInUser, isGroupChat }) {
    return (
        <div
            className="chatMessages__message__item__content"
            style={StyleButton(loggedInUser, message, isGroupChat)}
        >
            {message.chatId.isGroupChat && loggedInUser._id !== message.senderId._id && (
                <div className="ifGroupShowSenderName">
                    {message.senderId.name}
                </div>
            )}

            <div className="chatMessages__message__item__content__text">
                {message.message}
            </div>
            <div className="chatMessages__message__item__content__time">
                {formatTime(message.createdAt)}
            </div>
        </div>
    )
}

export default ChatMessage