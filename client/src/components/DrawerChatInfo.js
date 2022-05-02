import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd'
import { IoArrowBack } from "react-icons/io5";
import { IoMdExit, } from "react-icons/io";
import { Avatar, Image } from '@vechaiui/react';
// import openNotificationWithIcon from './Notification';
import { useSelector, useDispatch } from 'react-redux'
// import openNotificationWithIcon from './Notification';
// import callApi from '../apiCalls';
// import ChatsLoading from './ChatsLoading';
import ModelAddParticipent from './ModelAddParticipent';
import { selectedChat } from '../redux/slices/chats';
function DrawerGroupInfo({ showChatInfoDrawer, closeChatInfoDrawer }) {
    const [addParticipentModal, setAddParticipentModal] = useState(false);
    const dispatch = useDispatch();
    const [commonGroup, setCommonGroup] = useState([]);
    const {
        chats: { currSelectedChat, chats: allChats },
        auth: { user: loggedInUser }
    } = useSelector(state => state)

    function setCurrentSelectedChat(chat) {
        closeChatInfoDrawer();
        dispatch(selectedChat({ id: chat._id }));
    }
    useEffect(() => {
        (function getGroupsInCommon(allChats) {
            let arrOfCommonGroups = [];
            if (allChats.length > 1) {
                allChats.forEach((u) => {
                    let arr = [loggedInUser._id, currSelectedChat.users[0]._id]
                    let usersInchat = [...u.users.map(u => u._id)]
                    if (usersInchat.includes(arr[0]) && usersInchat.includes(arr[1])) {
                        arrOfCommonGroups.push(u);
                    }
                })
            }
            setCommonGroup(arrOfCommonGroups)
        })(allChats);
    }, [allChats, currSelectedChat, loggedInUser]);
    return (
        <Drawer
            className='drawer-group-name-and-image'
            title={
                <div className="flex justify-between items-center">
                    <span className='DrawergoBack gap-6 pr-4 pointer'>
                        <IoArrowBack onClick={closeChatInfoDrawer} />
                    </span>
                    Chat info
                </div>
            }
            closable={false}
            onClose={closeChatInfoDrawer}
            visible={showChatInfoDrawer}
            placement={'right'}
            width={"30%"}
        >
            {/* Group Image */}
            <div className="groupImageUpload">
                <Image
                    alt="bruce wayne"
                    htmlWidth={250}
                    htmlHeight={250}
                    className="object-cover"
                    src={currSelectedChat?.users[0].profileImage}
                />
            </div>
            {/* Group Name */}
            <div className="d_groupName bg-white">
                <h3>{currSelectedChat?.users[0].name}</h3>
            </div>
            {/* No. of total participents in group */}
            <div className="totalParticipants">
                <span>{currSelectedChat?.users[0].email}</span>
            </div>
            {/* List of actual Participents in roup */}
            <div className="groupParticipentsList mt-3">
                <div className="totalParticipentsinList" style={{ fontSize: "16px" }}>
                    <span>{commonGroup.length} groups in common</span>
                </div>
                {/* if admin then allow him to add participents */}
                {/* List of participents */}

                <div className="par_list">
                    {commonGroup.map((chat, index) =>
                        <div className="userListItem flex" key={index} onClick={() => setCurrentSelectedChat(chat)}>
                            <div className="chatImage" style={{ paddingLeft: "0px" }}>
                                <Avatar src={chat?.groupChatImage} size="2xl" />
                            </div>
                            <div className="chatDescLatestMsg pr-4">
                                <div className="chatNameAndTime flex items-center ">
                                    <p className='nameLatestMsg chatName m-0 p-0 text-black text-2xl'>{chat?.chatName}
                                    </p>
                                    <p className='nameLatestMsg m-0 p-0 text-black text-2xl'>
                                        {chat.users.length} members
                                    </p>
                                </div>
                                <div className={"chatDescAndSetting flex items-center"} >
                                    <p className='nameLatestMsg m-0 p-0 text-black text-2xl'>
                                        {chat.users.map(u => u.name).join(',')} group members
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {commonGroup.length > 10 && (
                        <div className="viewAllPaticipents">
                            View all ({commonGroup.length - 10} more)
                        </div>
                    )}
                </div>

            </div>
            {/* Exit Group */}
            <div className="exitGroup">
                <span>
                    <IoMdExit />
                </span>
                <span>Exit Group</span>
            </div>
            <ModelAddParticipent addParticipentModal={addParticipentModal} setAddParticipentModal={setAddParticipentModal} />
        </Drawer>
    )
}

export default DrawerGroupInfo