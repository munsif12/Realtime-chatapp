import React, { useState, useRef, useEffect } from 'react';
import { Drawer } from 'antd';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FormControl, Input } from '@vechaiui/react';

import GroupSelectedUserBadge from './GroupSelectedUserBadge';
import DrawerGroupNameAndImage from './DrawerGroupNameAndImage';
import SelectUser from './SelectUser';
const DrawerGroupChat = ({ visible, setVisible }) => {
    const [searchUser, setSearchUser] = useState('');
    const [childrenDrawer, setChildrenDrawer] = useState(false)
    const [groupSelectedUsers, setGroupSelectedUsers] = useState([]);
    const inputRef = useRef(null)
    const onClose = () => {
        setSearchUser('')
        setGroupSelectedUsers([])
        setVisible(false)
    };
    const handleSearch = (e) => setSearchUser(e.target.value);
    const onChildrenDrawerClose = () => setChildrenDrawer(false)
    const removeGroupSelecteduser = (user) => {
        const remainingUsers = groupSelectedUsers.filter(u => u.id !== user.id)
        setGroupSelectedUsers(remainingUsers)
    }
    useEffect(() => {
        // if (inputRef.current) inputRef.current.focus()
        inputRef?.current?.focus(); //both will do the same thing
    }, [groupSelectedUsers]);

    useEffect(() => {
        console.log('GroupChat Drawer :: Mounted')
        return () => {
            console.log('GroupChat Drawer :: Unounted')
        };
    }, []);

    return (
        <div className="groupChatSideDrawer">
            <Drawer
                title={
                    <div className="flex justify-between items-center">
                        <span className='DrawergoBack gap-6 pr-4 pointer'>
                            <IoArrowBack onClick={onClose} />
                        </span>
                        Add group participants
                    </div>
                }
                placement={'left'}
                width={"30%"}
                onClose={onClose}
                visible={visible}
                closable={false}
            >
                {
                    groupSelectedUsers.length > 0 && <GroupSelectedUserBadge
                        groupSelectedUsers={groupSelectedUsers}
                        removeGroupSelecteduser={removeGroupSelecteduser}
                    />
                }
                <FormControl >
                    <Input
                        ref={inputRef}
                        type="text" name="email" placeholder="Search or start  new chat." autoComplete='off'
                        autoFocus
                        value={searchUser}
                        onChange={(e) => handleSearch(e)}
                    />
                </FormControl>
                <div className="searchUserLists">
                    <SelectUser search={searchUser} onClose={onClose} setGroupSelectedUsers={setGroupSelectedUsers} />
                </div>
                {
                    groupSelectedUsers.length > 2 &&
                    <div className="submitSlectedUser flex justify-center">
                        <span className="groupSubmitBtn" onClick={() => setChildrenDrawer(true)}>
                            <IoArrowForward />
                        </span>
                    </div>
                }
            </Drawer>
            {childrenDrawer && <DrawerGroupNameAndImage childrenDrawer={childrenDrawer} onChildrenDrawerClose={onChildrenDrawerClose} groupSelectedUsers={groupSelectedUsers} onClose={onClose} />}
        </div>
    );
};

export default DrawerGroupChat;