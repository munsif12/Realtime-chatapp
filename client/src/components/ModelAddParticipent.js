import { FormControl, Input } from '@vechaiui/react';
import { Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import openNotificationWithIcon from './Notification';
import { TiTick } from "react-icons/ti";
import GroupSelectedUserBadge from './GroupSelectedUserBadge';
import { updateSelectedUsers } from '../redux/slices/chats';
import callApi from '../apiCalls';
import ListUsersAddParticipent from './ListUsersAddParticipent';
function ModelAddParticipent({ addParticipentModal, setAddParticipentModal }) {
    const [searchUser, setSearchUser] = useState('');
    const [groupSelectedUsers, setGroupSelectedUsers] = useState([]);
    const [participentSubmissionLoading, setParticipentSubmissionLoading] = useState(false);

    const dispatch = useDispatch();
    const {
        chats: { currSelectedChat },
    } = useSelector(state => state)

    const handleSearch = (e) => setSearchUser(e.target.value);
    const inputRef = useRef(null)

    const removeGroupSelecteduser = (user) => {
        const remainingUsers = groupSelectedUsers.filter(u => u._id !== user._id)
        setGroupSelectedUsers(remainingUsers)
    }
    async function handleAddParticipentSubmmit() {
        try {
            const body = {
                groupChatId: currSelectedChat._id,
                userId: groupSelectedUsers.map(u => u._id),
            }
            setParticipentSubmissionLoading(true);
            const data = await callApi.apiMethod('addParticipentsToGroup', 'POST', body);
            if (data.error) {
                throw data
            }
            dispatch(updateSelectedUsers({ chat: data.chat }))
            closeAddPartciipentModal()
            openNotificationWithIcon('success', data.message);
            setParticipentSubmissionLoading(false);
        } catch (error) {
            const { error: backendError } = error
            setParticipentSubmissionLoading(false);
            openNotificationWithIcon('error', backendError.message)
        }
    }
    function closeAddPartciipentModal() {
        setGroupSelectedUsers([])
        setSearchUser('')
        setAddParticipentModal(false);
    }
    useEffect(() => {
        inputRef?.current?.focus();
    }, [groupSelectedUsers]);

    useEffect(() => {
        console.log('Add participent component :: Mounted')
        return () => {
            console.log('Add participent component :: Unmounted')
        };
    }, []);


    return (
        <Modal
            title={
                <div className="flex justify-between items-center">
                    <span className='DrawergoBack gap-6 pr-4 pointer'>
                        <AiOutlineClose onClick={() => setAddParticipentModal(false)} />
                    </span>
                    Add  participents
                </div>
            }
            visible={addParticipentModal}
            closable={false}
            footer={null}
            onCancel={closeAddPartciipentModal}
        >
            <div className="addPartiModal">
                <FormControl >
                    <Input
                        ref={inputRef}
                        type="text" name="email" placeholder="Search ..." autoComplete='off'
                        autoFocus
                        value={searchUser}
                        onChange={(e) => handleSearch(e)}
                    />
                </FormControl>
                {/* Selected User Badges */}
                {groupSelectedUsers.length > 0 &&
                    <GroupSelectedUserBadge
                        groupSelectedUsers={groupSelectedUsers}
                        removeGroupSelecteduser={removeGroupSelecteduser}
                    />}
                {/* List of users */}
                <div className="listOfUsersForAddParticipents">
                    <ListUsersAddParticipent
                        searchUser={searchUser} groupSelectedUsers={groupSelectedUsers}
                        setGroupSelectedUsers={setGroupSelectedUsers}
                        removeGroupSelecteduser={removeGroupSelecteduser} />
                </div>
                {/* Submit Add Participents */}
                {groupSelectedUsers.length >= 1 &&
                    <span
                        className={`${participentSubmissionLoading ? "groupSubmitBtnLoading" : "groupSubmitBtn"}`}
                        onClick={handleAddParticipentSubmmit}>
                        {participentSubmissionLoading ? <AiOutlineLoading3Quarters /> : <TiTick />}
                    </span>}
            </div>
        </Modal>
    )
}

export default ModelAddParticipent