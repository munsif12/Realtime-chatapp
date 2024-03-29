import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { Image } from '@vechaiui/react';
import { IoArrowBack } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import callApi from '../apiCalls';
import ChatMessage from './ChatMessage';
import { MdArrowRight } from "react-icons/md";
import { MessageDateFormatter } from '../helpers/MessageDateFormatter';
import ChatsLoading from './ChatsLoading';
import { getStarredMessages } from '../redux/slices/chats';

function DrawerStarredMessages({ visible, setVisible }) {
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const [starredMessages, setStarredMessages] = useState([])
    const {
        auth: { user: loggedInUser },
        chats: { currSelectedChat }
    } = useSelector(state => state);
    useEffect(() => {
        console.log('Starred Message Drawer :: Mounted')
        return () => {
            console.log('Starred Message Drawer:: Unounted')
        };
    }, []);
    async function getAllStarredMessages() {
        try {
            setLoading(true);
            dispatch(getStarredMessages());
            const data = await callApi.apiMethod('starredMessages', 'GET', null, null);
            console.log(data);
            setStarredMessages(data.starredMessages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllStarredMessages()
    }, []);
    const onClose = () => setVisible(!visible)
    return (
        <div className="starredMessagesSideDrawer">
            <Drawer
                title={
                    <div className="flex justify-between items-center">
                        <span className='DrawergoBack gap-6 pr-4 pointer'>
                            <IoArrowBack onClick={onClose} />
                        </span>
                        Starred messages
                    </div>
                }
                placement={'left'}
                width={"30%"}
                onClose={onClose}
                visible={visible}
                closable={false}
            >
                {Loading && <ChatsLoading noOfSkeletons={4} />}
                {starredMessages.length && !Loading <= 0 && <div className='noRecordsFound'>You have'nt starred any message..</div>}
                {starredMessages.length > 0 && <div className="mainStarredMessageDrawer">
                    {
                        starredMessages.length > 0 && starredMessages
                            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                            .map((message, index) => {
                                return (
                                    <div className="starredMessageInfo" key={index}>
                                        <div className="starMessage_info">
                                            <div className="profileImgFromAndTo">
                                                {/* sender image */}
                                                <Image
                                                    alt="bruce wayne"
                                                    htmlWidth={"25px"}
                                                    htmlHeight={"25px"}
                                                    className="object-cover userViewImage senderImage"
                                                    src={message.senderId.profileImage}

                                                />
                                                {/* sender name */}
                                                <span className='SenderName commomStyling'>
                                                    {message.senderId._id === loggedInUser._id ?
                                                        'You' :
                                                        message.senderId.name}
                                                </span>
                                                {/* arrow icon */}
                                                <span className='arrow commomStyling'><MdArrowRight /></span>
                                                {/* receiver name or groupname */}
                                                <span className='SenderName commomStyling'>
                                                    {message.chatId.isGroupChat ?
                                                        message.chatId.chatName :
                                                        message.recieverId[0]._id === loggedInUser._id ?
                                                            'You' :
                                                            message.recieverId[0].name}
                                                </span>
                                            </div>
                                            <div className="starredDate">
                                                {MessageDateFormatter(message.updatedAt)}
                                            </div>
                                            {/* <div className="gotoStarMessage"></div> */}
                                        </div>
                                        {/* message which is starred */}
                                        <div className="starMessageComponent">
                                            <ChatMessage
                                                key={index}
                                                message={message}
                                                loggedInUser={loggedInUser}
                                                isGroupChat={currSelectedChat.isGroupChat}
                                                setAllMessages={setStarredMessages}
                                                allMessages={starredMessages}
                                                forStarDrawerShowSenderName={false}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
                }
            </Drawer>
        </div>
    )
}

export default DrawerStarredMessages