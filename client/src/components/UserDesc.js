import React, { useEffect } from 'react'
import { Avatar } from '@vechaiui/react'
import ChatsLoading from './ChatsLoading';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/slices/users';
import openNotificationWithIcon from './Notification';
// import { useSelector } from 'react-redux';

function UserDesc({ search, onClose: closeSideDrawer, setGroupSelectedUsers }) {
    const dispatch = useDispatch()

    const { loading, users } = useSelector(state => state.users)
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);

    function addUserToGroupChat(user) {
        setGroupSelectedUsers(preVal => {
            if (preVal.some(u => u.id === user._id)) {
                openNotificationWithIcon('error', 'User already added to group chat');
                return preVal
            }
            return [
                ...preVal,
                {
                    id: user._id,
                    name: user.name,
                    profileImage: user.profileImage,
                }
            ]
        })
    }
    if (loading) return <ChatsLoading />
    return (
        users
            .filter(chat => (
                chat.name.toLowerCase().includes(search.toLowerCase()) ||
                chat.email.toLowerCase().includes(search.toLowerCase())
            ))
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map((user, index) => {
                return (
                    <div className="userListItem flex" key={index} onClick={() => addUserToGroupChat(user)}>
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