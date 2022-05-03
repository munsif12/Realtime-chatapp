import { Image } from '@vechaiui/react'
import React from 'react'

function ChatBasicInfoCard({ currSelectedChat }) {
    return (
        <>
            {/* Group Image */}
            <div className="groupImageUpload">
                <Image
                    alt="No image"
                    htmlWidth={250}
                    htmlHeight={250}
                    className="object-cover"
                    src={currSelectedChat.isGroupChat ? currSelectedChat?.groupChatImage : currSelectedChat?.users[0].profileImage}
                />
            </div>
            {/* Group Name */}
            <div className="d_groupName bg-white">
                <h3>{currSelectedChat.isGroupChat ? currSelectedChat?.chatName : currSelectedChat?.users[0].name}</h3>
            </div>
            {/* No. of total participents in group */}
            <div className="totalParticipants">
                <span>{currSelectedChat.isGroupChat ?
                    `Group - ${currSelectedChat?.users.length}  participants` :
                    currSelectedChat?.users[0].email}
                </span>
            </div>
        </>
    )
}

export default ChatBasicInfoCard