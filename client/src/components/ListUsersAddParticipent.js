import { Avatar } from '@vechaiui/react'
import { Checkbox } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserFilter } from '../helpers/filterSearchValue'
import { getUsers } from '../redux/slices/users'
import openNotificationWithIcon from './Notification'

function ListUsersAddParticipent({ searchUser, setGroupSelectedUsers, groupSelectedUsers, removeGroupSelecteduser }) {
    const dispatch = useDispatch()
    const {
        chats: { currSelectedChat },
        users: { users },
        auth: { user: loggedInUser }
    } = useSelector(state => state);

    useEffect(() => {
        //check kro agr group admin ha tabhe usy add participent ka button show  hoga or tabhe woh  users ko get krny ga  lakin user get krny sa phly chk kro agr users phly sa redux ma pary ha to get mt kro wohe use krlo ---reducing network calls
        if (currSelectedChat?.groupAdmin?._id === loggedInUser._id) {
            if (users.length === 0) dispatch(getUsers())
        }
    }, [dispatch, currSelectedChat, loggedInUser, users]);

    function addUserToGroupChat(user) {
        setGroupSelectedUsers(preVal => {
            if (preVal.some(u => u._id === user._id)) {
                openNotificationWithIcon('error', 'User already added to group chat');
                return preVal
            }
            return [
                ...preVal,
                {
                    _id: user._id,
                    name: user.name,
                    profileImage: user.profileImage,
                }
            ]
        })
    }


    if (selectUserFilter(users, searchUser).length === 0) return <div className="noRecordsFound">Soory! No Users Available.</div>

    return (
        selectUserFilter(users, searchUser)
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map((user, index) => {
                return (
                    <div className="userListItem flex" key={index}>
                        <div className="checkBoxAddParticipent" style={{ alignSelf: "center" }}>
                            <Checkbox
                                checked={groupSelectedUsers.some(u => u._id === user._id) || currSelectedChat.users.some(u => u._id === user._id)}
                                onChange={(e) => e.target.checked ? addUserToGroupChat(user) : removeGroupSelecteduser(user)}
                            />
                        </div>
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

export default ListUsersAddParticipent