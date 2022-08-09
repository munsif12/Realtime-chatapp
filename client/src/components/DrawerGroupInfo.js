import React, { useState, useEffect } from 'react'
import { Drawer, Menu } from 'antd'
import { IoArrowBack, IoPersonAdd } from "react-icons/io5";
import { IoMdExit, } from "react-icons/io";

// import openNotificationWithIcon from './Notification';
import { useSelector, useDispatch } from 'react-redux'
import openNotificationWithIcon from './Notification';
import callApi from '../apiCalls';
import ChatsLoading from './ChatsLoading';
import { updateSelectedUsers } from '../redux/slices/chats';
import ModelAddParticipent from './ModelAddParticipent';
import ChatBasicInfoCard from './ChatBasicInfoCard';
import ModalViewMore from './ModalViewMore';
import AdminUserCard from './AdminUserCard';
function DrawerGroupInfo({ showGroupInfoDrawer, closeGroupInfoDrawer }) {
    const [isRemoveUserLoading, setIsRemoveUserLoading] = useState(false);
    const [removeParticipent, setremoveParticipent] = useState(false);
    const [addParticipentModal, setAddParticipentModal] = useState(false);
    const [viewMoreModal, setViewMoreModal] = useState(false);

    const dispatch = useDispatch();
    const {
        chats: { currSelectedChat },
        auth: { user: loggedInUser }
    } = useSelector(state => state)

    const closeViewMoreModal = () => setViewMoreModal(false)
    const openViewMoreModal = () => setViewMoreModal(true)
    async function reqToRemoveParticipent(userToRemove) {
        try {
            const body = {
                groupChatId: currSelectedChat._id,
                userId: userToRemove._id,
            }
            setIsRemoveUserLoading(true);
            const data = await callApi.apiMethod('removeParticipent', 'PUT', body);
            if (data.error) {
                throw data
            }
            dispatch(updateSelectedUsers({ chat: data.chat }))
            openNotificationWithIcon('success', data.message);
            setIsRemoveUserLoading(false);
        } catch (error) {
            const { error: backendError } = error
            setIsRemoveUserLoading(false);
            openNotificationWithIcon('error', backendError.message)
        }
    }
    function handleSettings(key, userToRemove) {
        switch (key) {
            case 'removeParticipent':
                reqToRemoveParticipent(userToRemove)
                break;
            default:
                break;
        }
    }

    const removeParticipentDropdown = (userToRemove) =>
        <Menu
            onClick={(e) => handleSettings(e.key, userToRemove)}
            className='dropDownSettings pt-5 pb-5 text-2xl text-black'
            items={[
                {
                    label: <span>Remove</span>,
                    key: 'removeParticipent',
                },
            ]}
        />

    const AdminAddParticipent = () => (
        <div className="adminAddParticipents" >
            <div className="userListItem flex"
                onClick={() => setAddParticipentModal(true)}>
                <div className="chatImage" style={{ paddingLeft: "0px" }}>
                    <span className='addParticipent'>
                        <IoPersonAdd />
                    </span>
                </div>
                <div className="chatDescLatestMsg pr-4">
                    <div className="chatNameAndTime flex items-center ">
                        <p className='nameLatestMsg chatName m-0 p-0 text-black text-2xl'>Add Paticipent</p>
                    </div>
                </div>
            </div>
        </div>
    )

    useEffect(() => {
        console.log('GroupInfo Drawer :: Mounted')
        return () => {
            console.log('GroupInfo Drawer :: Unounted')
        };
    }, []);

    return (
        <Drawer
            className='drawer-group-name-and-image'
            title={
                <div className="flex justify-between items-center">
                    <span className='DrawergoBack gap-6 pr-4 pointer'>
                        <IoArrowBack onClick={closeGroupInfoDrawer} />
                    </span>
                    Group info
                </div>
            }
            closable={false}
            onClose={closeGroupInfoDrawer}
            visible={showGroupInfoDrawer}
            placement={'right'}
            width={"30%"}
        >
            {/* Group Image,name,no of participents */}
            <ChatBasicInfoCard currSelectedChat={currSelectedChat} />
            {/* List of actual Participents in roup */}
            <div className="groupParticipentsList mt-3">
                <div className="totalParticipentsinList" style={{ fontSize: "16px" }}>
                    <span>{currSelectedChat?.users.length} participants</span>
                </div>
                {/* if admin then allow him to add participents */}
                {
                    currSelectedChat?.groupAdmin?._id === loggedInUser._id && (
                        <AdminAddParticipent />
                    )
                }
                {/* List of participents */}
                {isRemoveUserLoading ? <ChatsLoading /> :
                    <div className="par_list">
                        {currSelectedChat.users
                            .slice(0, 10)
                            .map((user, index) => (
                                <AdminUserCard user={user} key={index} removeParticipentDropdown={removeParticipentDropdown} />
                            ))}
                        {currSelectedChat.users.length > 10 && (
                            <div className="viewAllPaticipents" onClick={openViewMoreModal}>
                                View all ({currSelectedChat?.users.length - 10} more)
                            </div>
                        )}
                    </div>
                }
            </div>
            {/* Exit Group */}
            <div className="exitGroup">
                <span>
                    <IoMdExit />
                </span>
                <span>Exit Group</span>
            </div>
            {addParticipentModal && <ModelAddParticipent addParticipentModal={addParticipentModal} setAddParticipentModal={setAddParticipentModal} />}
            {viewMoreModal && <ModalViewMore
                removeParticipent={removeParticipent}
                removeParticipentDropdown={removeParticipentDropdown}
                viewMoreModal={viewMoreModal}
                closeViewMoreModal={closeViewMoreModal}
                listToMap={currSelectedChat.users.slice(10, currSelectedChat.length)}
                setremoveParticipent={setremoveParticipent} />}
        </Drawer>
    )
}

export default React.memo(DrawerGroupInfo)