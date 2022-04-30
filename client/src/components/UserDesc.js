import React, { useEffect, useState } from 'react'
import { Avatar } from '@vechaiui/react'
import ChatsLoading from './ChatsLoading';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/slices/users';
import openNotificationWithIcon from './Notification';
import callApi from '../apiCalls';
import { selectedChat, setChats } from '../redux/slices/chats'
import { selectUserFilter } from '../helpers/filterSearchValue';
// import { useSelector } from 'react-redux';

function UserDesc({ search, onClose: closeSideDrawer }) {
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const { loading, users } = useSelector(state => state.users)
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);

    async function handleCreateOneToOneChat(id) {
        try {
            const body = {
                userId: id
            }
            setLoading(true);
            const data = await callApi.apiMethod('createChat', 'POST', body);
            openNotificationWithIcon('success', data.message)
            dispatch(setChats({ chat: data.chat }))
            dispatch(selectedChat({ id: data.chat._id }));
            setLoading(false);
            closeSideDrawer();
        } catch (error) {
            setLoading(false);
            openNotificationWithIcon('error', error.message)
        }
    }
    if (Loading || loading) return <ChatsLoading />
    if (selectUserFilter(users, search).length === 0) return <div className='noRecordsFound'>Soory! No users found.</div>
    return (

        selectUserFilter(users, search)
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