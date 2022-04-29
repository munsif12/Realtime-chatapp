import React from 'react'
import { Avatar } from '@vechaiui/react'
import { MdOutlineClear } from "react-icons/md";
function GroupSelectedUserBadge({ groupSelectedUsers, removeGroupSelecteduser }) {
    return (
        <div className="seletedUsersForGroupChat inline-block">
            {
                groupSelectedUsers.map((user, index) => (
                    <div className="su_user flex items-center  " key={index}>
                        <Avatar src={user.profileImage} size="sm" />
                        <div className="nameAndRemoveIcon flex ">
                            <span className="su_name">{user.name}</span>
                            <span className='su_remove' onClick={() => removeGroupSelecteduser(user)}>
                                <MdOutlineClear />
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default GroupSelectedUserBadge