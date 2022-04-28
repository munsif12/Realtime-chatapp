import React, { useState } from 'react';
import { Drawer } from 'antd';
import { IoArrowBack } from "react-icons/io5";
import { FormControl, Input } from '@vechaiui/react';
import UserDesc from './UserDesc';
const DrawerNewChat = ({ visible, setVisible }) => {
    const [searchUser, setSearchUser] = useState('');
    const onClose = () => setVisible(false);
    const handleSearch = (e) => setSearchUser(e.target.value);
    return (
        <div className="newChatSideDrawer">
            <Drawer
                title={
                    <div className="flex justify-between items-center">
                        <span className='DrawergoBack gap-6 pr-4 pointer'>
                            <IoArrowBack onClick={onClose} />
                        </span>
                        New Chat
                    </div>
                }
                placement={'left'}
                width={"30%"}
                onClose={onClose}
                visible={visible}
                closable={false}
            >
                <FormControl >
                    <Input
                        type="text" name="email" placeholder="Search or start  new chat." autoComplete='off'
                        autoFocus
                        value={searchUser}
                        onChange={(e) => handleSearch(e)}
                    />
                </FormControl>
                <div className="searchUserLists">
                    <UserDesc search={searchUser} onClose={onClose} />
                </div>
            </Drawer>
        </div>
    );
};

export default DrawerNewChat;