import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd'
import { IoArrowBack } from "react-icons/io5";
import { IoMdExit, } from "react-icons/io";
import { Avatar } from '@vechaiui/react';
import { useSelector, useDispatch } from 'react-redux'
import ChatBasicInfoCard from './ChatBasicInfoCard';
import ModelAddParticipent from './ModelAddParticipent';
import { selectedChat } from '../redux/slices/chats';
import ModalViewMore from './ModalViewMore';
function DrawerGroupInfo({ showChatInfoDrawer, closeChatInfoDrawer }) {
    const [addParticipentModal, setAddParticipentModal] = useState(false);
    const [commonGroup, setCommonGroup] = useState([]);
    const [viewMoreModal, setViewMoreModal] = useState(false);
    const dispatch = useDispatch();
    const {
        chats: { currSelectedChat, chats: allChats },
        auth: { user: loggedInUser }
    } = useSelector(state => state)


    function closeViewMoreModal() {
        setViewMoreModal(false)
    }
    function openViewMoreModal() {
        setViewMoreModal(true)
    }
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
            {/* user Image,name,email */}
            <ChatBasicInfoCard currSelectedChat={currSelectedChat} />
            {/* List of actual Participents in roup */}
            <div className="groupParticipentsList mt-3">
                <div className="totalParticipentsinList" style={{ fontSize: "16px" }}>
                    <span>{commonGroup.length} groups in common</span>
                </div>
                {/* List of mutual groups */}
                <div className="par_list">
                    {commonGroup
                        .slice(0, 10)
                        .map((chat, index) =>
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
                        <div className="viewAllPaticipents" onClick={openViewMoreModal}>
                            View all ({commonGroup.length - 10} more)
                        </div>
                    )}
                </div>
            </div>
            {/* Exit Group */}
            <div className="exitGroup">
                <span><IoMdExit /></span>
                <span>Exit Group</span>
            </div>
            <ModelAddParticipent
                addParticipentModal={addParticipentModal}
                setAddParticipentModal={setAddParticipentModal} />
            <ModalViewMore
                viewMoreModal={viewMoreModal}
                closeViewMoreModal={closeViewMoreModal}
                listToMap={commonGroup.slice(10, commonGroup.length)} />
        </Drawer>
    )
}

export default DrawerGroupInfo