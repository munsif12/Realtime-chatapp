import React, { useEffect, useState } from 'react'
import { Dropdown, Menu } from 'antd';
import formatTime from '../helpers/formatTime'
import { AiOutlineDown } from "react-icons/ai";
import callApi from '../apiCalls';
import { RiStarSFill } from "react-icons/ri";

const StyleButton = (loggedInUser, message, isGroupChat, forStarDrawerShowSenderName) => {
    let style = { color: "#000" }
    if (isGroupChat && loggedInUser._id !== message.senderId._id) {
        //if the messaege in in group chat and not send by the logged in user 
    }
    if (!forStarDrawerShowSenderName) {
        style.maxWidth = '100%';
        style.marginTop = '0px';
        style.margin = "0 !important"
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


function ChatMessage({ message, loggedInUser, isGroupChat, allMessages, setAllMessages, forStarDrawerShowSenderName = true }) {
    const [MessageHover, setMessageHover] = useState(false);
    const [starred, setStarred] = useState(false);
    const toggleMouseHover = () => setMessageHover(!MessageHover)

    function deleteMessage(messageId) {
        console.log("delete message", messageId)
    }
    async function starMessage(message) {
        //check if userdId is in stars array
        const isStarred = message.stars.includes(loggedInUser._id);
        let messageStatus = isStarred ? 'unstarMessage' : 'starMessage';
        const staredMessage = await callApi.apiMethod(messageStatus, 'post', null, `${message._id}`);
        //find message in allMessages and update it
        if (!forStarDrawerShowSenderName) {//means remove the star message from strredMessageDrawer
            //filter all messages and update the message
            const updatedMessages = allMessages.filter((message) => message._id !== staredMessage.starredMessage._id);
            setAllMessages(updatedMessages);
        } else {
            const updatedMessages = allMessages.map(msg => {
                if (msg._id === staredMessage.starredMessage._id) {
                    return { ...msg, stars: [...staredMessage.starredMessage.stars] }
                }
                return msg
            })
            setAllMessages(updatedMessages)
        }

    }

    function handleSettings(key, message) {
        switch (key) {
            case 'deleteMessage':
                deleteMessage(message._id)
                break;
            case 'starMessage':
                starMessage(message)
                break;
            default:
                break;
        }
    }
    const removeParticipentDropdown = (message) => {
        const menuItems = [{
            label: <span>Delete message</span>,
            key: 'deleteMessage',
        },
        {
            label: <span>{message?.stars.includes(loggedInUser._id) ? "Unstar message" : "Star message"}</span>,
            key: 'starMessage',
        }]
        //if the message is not sent by the logged in user
        if (loggedInUser._id !== message.senderId._id) {
            menuItems.push({
                label: <span>Blur message</span>,
                key: 'blurMessage',
            })
            menuItems.push({
                label: <span>Report message</span>,
                key: 'reportMessage',
            })
            menuItems.push({
                label: <span>Block user</span>,
                key: 'blockUser',
            })
        }
        return <Menu
            onClick={(e) => handleSettings(e.key, message)}
            className='dropDownSettings pt-5 pb-5 text-2xl text-black'
            items={menuItems}
        />
    }

    useEffect(() => {
        //instead of checking before evering condition we can check here only once
        message?.stars.includes(loggedInUser._id) ?
            setStarred(true) :
            setStarred(false)

    }, [message?.stars, loggedInUser]);

    return (
        <div
            className="chatMessages__message__item__content"
            style={StyleButton(loggedInUser, message, isGroupChat, forStarDrawerShowSenderName)}
            onMouseEnter={toggleMouseHover}
            onMouseLeave={toggleMouseHover}
        >
            <div className="messageBasicInfo">
                {forStarDrawerShowSenderName && message.chatId.isGroupChat && loggedInUser._id !== message.senderId._id && (
                    <div className="ifGroupShowSenderName" style={{ color: message.senderId.color ? message.senderId.color : '#008069' }}>
                        {message.senderId.name}
                    </div>
                )}

                <div className="chatMessages__message__item__content__text">
                    {message.message}
                </div>
                <div className="chatMessages__message__item__content__time">
                    {starred && <span className='messageStarIcon'><RiStarSFill /></span>}
                    {formatTime(message.createdAt)}
                </div>
            </div>
            {/* dropdown to remove message or other actions */}
            {
                MessageHover && (
                    <Dropdown
                        className='messageSettingsDropdown'
                        overlay={() => removeParticipentDropdown(message)}
                        trigger={['click']} >
                        <AiOutlineDown />
                    </Dropdown>
                )
            }
        </div >
    )
}

export default ChatMessage