import { Avatar } from '@vechaiui/react'
import React from 'react'

function ChatDesc({ dummyChats }) {
    return (

        dummyChats.map((chat, index) => {
            return (
                <div className="userListItem flex" key={index}>
                    <div className="chatImage">
                        <Avatar src={chat.imageUrl} size="2xl" />
                    </div>
                    <div className="chatDescLatestMsg pr-4">
                        <div className="chatNameAndTime flex items-center ">
                            <p className='nameLatestMsg chatName m-0 p-0 text-black text-2xl'>{chat.name}</p>
                            <span className='chatTime m-0 p-0 text-black'>{chat.time}</span>
                        </div>
                        <div className="chatDescAndSetting flex items-center">
                            <p className='nameLatestMsg m-0 p-0 text-black text-2xl'>{chat.latestMessage}</p>
                            <span className='chatSettingIcon m-0 p-0 text-black'>{chat.time}</span>
                        </div>
                    </div>
                </div>
            )
        })

    )
}

export default ChatDesc