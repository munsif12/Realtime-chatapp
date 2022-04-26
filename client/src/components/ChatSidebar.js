import React, { useState } from 'react'
import { Avatar, FormControl, Input } from '@vechaiui/react'
import { useNavigate } from 'react-router-dom';
import { dummyChats } from '../constant';
import { IoMdMore, IoMdNotificationsOutline } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { Dropdown, Menu } from 'antd';
import DrawerNewChat from './DrawerNewChat';
import ChatDesc from './ChatDesc';
import { useDispatch } from 'react-redux'
import { Logout } from '../redux/slices/auth';

function ChatSidebar() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const dispatch = useDispatch()
    const showDrawer = () => {
        setVisible(true);
    };

    function handleSettings(key) {
        switch (key) {
            case 'logout':
                dispatch(Logout())
                localStorage.removeItem('authToken')
                localStorage.removeItem('user')
                navigate('/')
                break;

            default:
                break;
        }
    }

    const menu = (
        <Menu
            onClick={(e) => handleSettings(e.key)}
            className='dropDownSettings pt-4 pb-2 text-2xl text-black'
            items={[
                {
                    label: <span>1st menu item</span>,
                    key: 0,
                },
                {
                    label: <span >2nd menu item</span>,
                    key: 1,
                },
                {
                    label: <span >Logout</span>,
                    key: 'logout',
                },
            ]}
        />
    );


    //useEffect to fetch all chats in which user exists
    //make t redux state
    return (
        <div className="sidebar w-1/3 flex  text-2xl ">
            <div className='sidebarHeader py-2 px-4 w-full flex justify-between items-center'>
                <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" size="2xl" />
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
                    <DrawerNewChat visible={visible} setVisible={setVisible} />
                </div>
            </div>
            <main>
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
                    <ChatDesc dummyChats={dummyChats} />
                </div>
            </main>
        </div>
    )
}

export default ChatSidebar