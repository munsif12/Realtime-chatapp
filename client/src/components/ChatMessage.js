import React, { useState } from 'react'
import { Dropdown, Menu } from 'antd';
import formatTime from '../helpers/formatTime'
import { AiOutlineDown } from "react-icons/ai";

const StyleButton = (loggedInUser, message, isGroupChat) => {
    let style = { color: "#000" }
    if (isGroupChat && loggedInUser._id !== message.senderId._id) {
        style.paddingTop = "25px";
    }
    if (loggedInUser._id === message.senderId._id) {
        style.backgroundColor = "#d9fdd3";
        style.alignSelf = "end"
        style.display = "flex"
        style.flexDirection = "revert"
    }
    if (loggedInUser._id !== message.senderId._id) {
        style.backgroundColor = "#fff"
    }
    return style;
};


function ChatMessage({ message, loggedInUser, isGroupChat }) {
    const [MessageHover, setMessageHover] = useState(false);
    const toggleMouseHover = () => setMessageHover(!MessageHover)

    function deleteMessage(messageId) {
        console.log("delete message", messageId)
    }
    function starMessage(messageId) {
        console.log('starred message', messageId)
    }

    function handleSettings(key, messageId) {
        switch (key) {
            case 'deleteMessage':
                deleteMessage(messageId)
                break;
            case 'starMessage':
                starMessage(messageId)
                break;
            default:
                break;
        }
    }
    const removeParticipentDropdown = (messageId) =>
        <Menu
            onClick={(e) => handleSettings(e.key, messageId)}
            className='dropDownSettings pt-5 pb-5 text-2xl text-black'
            items={[
                {
                    label: <span>Remove</span>,
                    key: 'deleteMessage',
                },
                {
                    label: <span>Start message</span>,
                    key: 'starMessage',
                },
            ]}
        />

    return (
        <div
            className="chatMessages__message__item__content"
            style={StyleButton(loggedInUser, message, isGroupChat)}
            onMouseEnter={toggleMouseHover}
            onMouseLeave={toggleMouseHover}
        >
            <div className="messageBasicInfo">
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
            {/* dropdown to remove message or other actions */}
            {MessageHover && loggedInUser._id === message.senderId._id && (
                <Dropdown
                    overlay={() => removeParticipentDropdown(message._id)}
                    trigger={['click']} >
                    <AiOutlineDown style={{ margin: "0px 0px 5px 5px", cursor: "pointer" }} />
                </Dropdown>
            )}
        </div>
    )
}

export default ChatMessage