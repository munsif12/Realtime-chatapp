import { Avatar } from '@vechaiui/react'
import React, { useState } from 'react'
import { IoMdMore } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { Dropdown, Menu } from 'antd';
import DrawerGroupInfo from '../components/DrawerGroupInfo';
import DrawerChatInfo from '../components/DrawerChatInfo'

function ChatViewHeader() {
    const { currSelectedChat } = useSelector(state => state.chats)
    const [showGroupInfoDrawer, setShowGroupInfoDrawer] = useState(false);
    const [showChatInfoDrawer, setShowChatInfoDrawer] = useState(false);


    const closeGroupInfoDrawer = () => setShowGroupInfoDrawer(false);
    const closeChatInfoDrawer = () => setShowChatInfoDrawer(false);
    function handleSettings(key, selectedChat) {
        switch (key) {
            case 'groupChat':
                setShowGroupInfoDrawer(true)
                break;
            case 'chatInfo':
                setShowChatInfoDrawer(true)
                break;
            case 'clearMessages':
                break;

            case 'exitGroup':
                break;
            default:
                break;
        }
    }
    const ChatDropdown = (chatType, selectedChat) =>
        <Menu
            onClick={(e) => handleSettings(e.key, selectedChat)}
            className='dropDownSettings pt-5 pb-5 text-2xl text-black'
            items={[
                chatType === 'groupChat' ? {
                    label: 'Group info',
                    key: 'groupChat',
                } : {
                    label: 'Chat info',
                    key: 'chatInfo',
                },
                {
                    label: 'Clear messages',
                    key: 'clearMessages',
                },
                {
                    danger: true,
                    label: <span className='dangerBtn'>Exist Group</span>,
                    key: 'exitGroup',

                },
            ]}
        />
    return (
        <>
            <DrawerGroupInfo
                showGroupInfoDrawer={showGroupInfoDrawer}
                closeGroupInfoDrawer={closeGroupInfoDrawer}
            />
            <DrawerChatInfo showChatInfoDrawer={showChatInfoDrawer} closeChatInfoDrawer={closeChatInfoDrawer} />
            <div className='chatViewHeader flex items-center text-2xl' style={{ fontSize: "24px", color: "black" }}>
                <div className="selectedChatImage">
                    <Avatar src={currSelectedChat.isGroupChat ? currSelectedChat?.groupChatImage : currSelectedChat.users[0].profileImage} size="2xl" />
                </div>
                <div className="selectedChatName">
                    <span>
                        {currSelectedChat.isGroupChat ? currSelectedChat.chatName : currSelectedChat.users[0].name}
                    </span>
                    <p className="ChatHeaderGroupParticipents m-0 p-0">
                        {currSelectedChat.isGroupChat && (
                            currSelectedChat.users.map(user => user.name).join(', ')
                        )}
                    </p>
                </div>
                <div className="selectedChatSetting flex gap-3 items-center">
                    <div className="settingMessage">
                        <HiOutlineSearch />
                    </div>
                    <div className="settingVerticalEllipse">
                        <Dropdown
                            overlay={ChatDropdown(currSelectedChat.isGroupChat && "groupChat", currSelectedChat)} trigger={['click']} >
                            <IoMdMore />
                        </Dropdown>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatViewHeader