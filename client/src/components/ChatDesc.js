import { Avatar } from '@vechaiui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { homeChatsFilter } from '../helpers/filterSearchValue'
import { MessageDateFormatter } from '../helpers/MessageDateFormatter'
import { myChats, selectedChat } from '../redux/slices/chats'
import ChatsLoading from './ChatsLoading'
import openNotificationWithIcon from './Notification'
function ChatDesc({ search = '' }) {
    const dispatch = useDispatch()
    const {
        loading, chats, error
    } = useSelector(state => state.chats)

    useEffect(() => {
        if (error.message !== '') openNotificationWithIcon('error', error.message)
    }, [error.status, error.message]);

    useEffect(() => {
        if (chats.length < 1)
            dispatch(myChats())
    }, [dispatch]);

    function setSelectedChat(chat) {
        dispatch(selectedChat({ id: chat._id }))
    }
    if (loading) return <ChatsLoading />

    if (homeChatsFilter(chats, search).length === 0) return <div className="noRecordsFound">Soory! No Chats Available.</div>

    return (
        homeChatsFilter(chats, search)
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((chat, index) => {
                return (
                    <div className="userListItem flex" key={index} onClick={() => setSelectedChat(chat)}>
                        <div className="chatImage">
                            <Avatar loading='lazy' src={chat.isGroupChat ? chat?.groupChatImage : chat.users[0].profileImage} size="2xl" />
                        </div>
                        <div className="chatDescLatestMsg pr-4">
                            <div className="chatNameAndTime flex items-center ">
                                <p className='nameLatestMsg chatName m-0 p-0 text-black text-2xl'>
                                    {chat.isGroupChat ? chat.chatName : chat.users[0].name}</p>
                                {/* <span className='chatTime m-0 p-0 text-black'>{formatTIme(chat?.latestMessage?.createdAt ?? chat.createdAt)}</span> */}
                                <span className='chatTime m-0 p-0 text-black'>{MessageDateFormatter(chat?.latestMessage?.createdAt ?? chat.createdAt)}</span>
                            </div>
                            <div className="chatDescAndSetting flex items-center">
                                <p className='nameLatestMsg m-0 p-0 text-black text-2xl'>
                                    {chat?.latestMessage?.message ?? 'No messages available.'}
                                </p>
                                {/* <span className='chatSettingIcon m-0 p-0 text-black'>{chat.time}</span> */}
                            </div>
                        </div>
                    </div>
                )
            })

    )
}

export default React.memo(ChatDesc)