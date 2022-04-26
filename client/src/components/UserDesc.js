import React, { useState } from 'react'
import { Avatar } from '@vechaiui/react'
import openNotificationWithIcon from './Notification';
import ChatsLoading from './ChatsLoading';
import callApi from '../apiCalls';


function UserDesc({ users, search, onClose: closeSideDrawer }) {
    const [Loading, setLoading] = useState(false);

    async function handleCreateOneToOneChat(id) {
        console.log('why i am running handleCreateOneToOneChat')
        try {
            const body = {
                userId: id
            }
            setLoading(true);
            const data = await callApi.apiMethod('createChat', 'POST', body);
            openNotificationWithIcon('success', data.message)
            setLoading(false);
            closeSideDrawer();
        } catch (error) {
            setLoading(false);
            openNotificationWithIcon('error', error.message)
        }
    }
    if (Loading) return <ChatsLoading />
    return (
        users
            .filter(chat => (
                chat.name.toLowerCase().includes(search.toLowerCase()) ||
                chat.email.toLowerCase().includes(search.toLowerCase())
            ))
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map((user, index) => {
                return (
                    <div className="userListItem flex" key={index} onClick={() => handleCreateOneToOneChat(user._id)}>
                        <div className="chatImage">
                            <Avatar src={user.profileImage} size="2xl" />
                        </div>
                        <div className="chatDescLatestMsg pr-4">
                            <div className="chatNameAndTime flex items-center ">
                                <p className='nameLatestMsg chatName m-0 p-0 text-black text-2xl'>{user.name}</p>
                            </div>
                            <div className="chatDescAndSetting flex items-center">
                                <p className='nameLatestMsg m-0 p-0 text-black text-2xl'>{user.email}</p>
                            </div>
                        </div>
                    </div>
                )
            })
    )
}

export default UserDesc