import React, { useState } from 'react'
import { Avatar, FormControl, Input } from '@vechaiui/react'
import { useNavigate } from 'react-router-dom';
import { IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { Badge, Dropdown, Menu } from 'antd';
import DrawerNewChat from './DrawerNewChat';
import ChatDesc from './ChatDesc';
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../redux/slices/auth';
import DrawerGroupChat from './DrawerGroupChat';
import { chatsLogout } from '../redux/slices/chats';
import { usersLogout } from '../redux/slices/users';
import openNotificationWithIcon from './Notification';
import DrawerUserProfile from './DrawerUserProfile';
import DrawerStarredMessages from './DrawerStarredMessages';
function ChatSidebar() {
    const [searchUser, setSearchUser] = useState('');
    const [visible, setVisible] = useState(false);
    const [showGroupDrawer, setShowGroupDrawer] = useState(false);
    const [userProfileDrawer, setUserProfileDrawer] = useState(false);
    const [showStarredMessageDrawer, setShowStarredMessageDrawer] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth)
    const showDrawer = () => setVisible(true);
    const showGroupChatDrawer = () => {
        setShowGroupDrawer(true)
        openNotificationWithIcon('info', 'Please select atlest 3 users to start chat.')
    };
    const openStarredMessageDrawer = () => setShowStarredMessageDrawer(true)

    function handleSettings(key) {
        switch (key) {
            case 'logout':
                dispatch(Logout())
                dispatch(usersLogout())
                dispatch(chatsLogout())
                localStorage.removeItem('authToken')
                localStorage.removeItem('user')
                navigate('/')
                break;
            case 'starredMessages':
                openStarredMessageDrawer()
                break;
            case 'groupChat':
                showGroupChatDrawer()
                break;
            default:
                break;
        }
    }

    const menu = (
        <Menu
            onClick={(e) => handleSettings(e.key)}
            className='dropDownSettings pt-5 pb-5 text-2xl text-black'
            items={mainDropDownItems}
        />
    );
    return (
        <div className="sidebar w-[40%] flex  text-2xl ">
            {/* Chats Header */}
            <div className='sidebarHeader py-2 px-4 w-full flex justify-between items-center'>
                <Avatar className="settingUserProfileAvatar" src={user.profileImage} size="2xl" onClick={() => setUserProfileDrawer(true)} />
                <div className="settings flex gap-3 items-center">
                    <div className="settingNotifica">
                        {/* <Badge
                            count={25}
                            className="site-badge-count-109"
                            style={{ backgroundColor: '#52c41a' }} /> */}
                        <IoMdNotificationsOutline />
                    </div>
                    <div className="settingMessage">
                        <MdMessage onClick={showDrawer} />
                    </div>
                    <div className="settingVerticalEllipse">
                        <Dropdown overlay={menu} trigger={['click']} >
                            <IoMdMore />
                        </Dropdown>
                    </div>
                    {visible && <DrawerNewChat visible={visible} setVisible={setVisible} />}
                    {showGroupDrawer && <DrawerGroupChat visible={showGroupDrawer} setVisible={setShowGroupDrawer} />}
                    {userProfileDrawer && <DrawerUserProfile visible={userProfileDrawer} setVisible={setUserProfileDrawer} />}
                    {showStarredMessageDrawer && <DrawerStarredMessages visible={showStarredMessageDrawer} setVisible={setShowStarredMessageDrawer} />}
                </div>
            </div>
            <main className='ChatsRightView'>
                {/* Chat Search */}
                <div className="userSearchBox">
                    <FormControl >
                        <Input
                            type="text" name="email" placeholder="Search or start  new chat." autoComplete='off'
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                        />
                    </FormControl>
                </div>
                {/* Chat Lists */}
                <div className="usersList">
                    <ChatDesc search={searchUser} />
                </div>
            </main>
        </div>
    )
}

export default ChatSidebar



const mainDropDownItems = [
    {
        label: <span>New group</span>,
        key: 'groupChat',
    },
    {
        label: <span >Starred messages</span>,
        key: 'starredMessages',
    },
    {
        label: <span >Logout</span>,
        key: 'logout',
    },
]