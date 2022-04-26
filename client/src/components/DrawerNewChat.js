import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { IoArrowBack } from "react-icons/io5";
import { FormControl, Input } from '@vechaiui/react';
import UserDesc from './UserDesc';
import ChatsLoading from './ChatsLoading';
import openNotificationWithIcon from './Notification';
import callApi from '../apiCalls';



const DrawerNewChat = ({ visible, setVisible }) => {
    const [searchUser, setSearchUser] = useState('');
    const [chatLists, setChatLists] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                const data = await callApi.apiMethod('getChats', 'GET');
                setChatLists(data.users)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                openNotificationWithIcon('error', error.message)
            }
        })();
    }, []);
    const onClose = () => {
        setVisible(false);
    };
    const handleSearch = async (e) => {
        setSearchUser(e.target.value);
    };

    return (
        <>

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
                            value={searchUser}
                            onChange={(e) => handleSearch(e)}
                        />
                    </FormControl>
                    <div className="searchUserLists">
                        {!Loading ? <UserDesc users={chatLists} search={searchUser} onClose={onClose} /> : <ChatsLoading />}
                    </div>
                </Drawer>
            </div>
        </>
    );
};

export default DrawerNewChat;