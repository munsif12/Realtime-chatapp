import React, { useState } from 'react'
import { Dropdown } from 'antd'
import { Avatar } from '@vechaiui/react';
import { AiOutlineDown } from "react-icons/ai";
import { useSelector } from 'react-redux';

function AdminUserCard({ user, removeParticipentDropdown }) {
    const [removeParticipent, setremoveParticipent] = useState(false);
    const {
        chats: { currSelectedChat },
        auth: { user: loggedInUser }
    } = useSelector(state => state)
    return (
        <div className="userListItem flex" >
            <div className="chatImage" style={{ paddingLeft: "0px" }}>
                <Avatar src={user?.profileImage} size="2xl" />
            </div>
            <div className="chatDescLatestMsg pr-4"
                onMouseOver={() => setremoveParticipent(true)}
                onMouseOut={() => setremoveParticipent(false)}>
                <div className="chatNameAndTime flex items-center ">
                    <p className='nameLatestMsg chatName m-0 p-0 text-black text-2xl'>{user?.name}
                    </p>
                    {currSelectedChat?.groupAdmin?._id === user._id &&
                        <span className='groupAdminBadge'>
                            Group admin
                        </span>
                    }
                </div>
                <div className={"chatDescAndSetting flex items-center"} >
                    <p className='nameLatestMsg m-0 p-0 text-black text-2xl'>
                        {user?.email}
                    </p>
                    {
                        currSelectedChat?.groupAdmin?._id === loggedInUser._id && // to show dropdown if the loggedin user is admin of this group
                        currSelectedChat?.groupAdmin?._id !== user._id && // to not show dropDown infront of group admin
                        removeParticipent && <div
                            className="showDropDownToRemoveParticipent">
                            <Dropdown
                                overlay={() => removeParticipentDropdown(user)}
                                trigger={['click']} >
                                <AiOutlineDown />
                            </Dropdown>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminUserCard