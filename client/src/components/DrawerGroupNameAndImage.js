import { Drawer } from 'antd'
import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { FormControl, Image, Input } from '@vechaiui/react';
import loadingGif from '../assets/images/loadingGif.gif'
import uploadImageToCloudinary from '../config/uploadImageToCloudnary';
import { TiTick } from "react-icons/ti";
import openNotificationWithIcon from './Notification';
import { useSelector, useDispatch } from 'react-redux'
import callApi from '../apiCalls';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { selectedChat, setChats } from '../redux/slices/chats';
function DrawerGroupNameAndImage({ groupSelectedUsers, onChildrenDrawerClose, childrenDrawer, onClose: parentDrawerClose }) {
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState('https://robohash.org/nequeodiosapiente.png?size=600x600&set=set1');
    const [isImageLoading, setisImageLoading] = useState(false)
    const [groupChatLoading, setGroupChatLoading] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    async function handleGroupCreationSubmmit() {
        if (groupName.length < 3) {
            openNotificationWithIcon('error', 'Group name should be atleast 3 characters long')
            return
        }
        const userIds = groupSelectedUsers.map(u => u.id)
        //group ids must include the current logedin user
        userIds.push(user._id)
        const body = {
            chatName: groupName,
            groupChatImage: groupImage,
            userIds
        };
        try {
            setGroupChatLoading(true);
            const data = await callApi.apiMethod('createGroupChat', 'POST', body);
            dispatch(setChats({ chat: data.chat }))
            dispatch(selectedChat({ id: data.chat._id }));
            onChildrenDrawerClose();
            parentDrawerClose();
            openNotificationWithIcon('success', data.message)
            setGroupChatLoading(false);
        } catch (error) {
            openNotificationWithIcon('error', error.message)
        }
    }
    async function uploadGroupImage(e) {
        try {
            setisImageLoading(true);
            const file = e.target.files[0];
            if (file.size >= 5000000) {
                alert("File size is too big")
                return
            }
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                alert("File type is not supported")
                return
            }
            setisImageLoading(true)
            const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/demo/image/upload';
            const CLOUDINARY_UPLOAD_PRESET = 'docs_upload_example_us_preset';
            const data = new FormData()
            data.append("file", file)
            data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
            const imageUrl = await uploadImageToCloudinary(CLOUDINARY_URL, data)
            setGroupImage(imageUrl)
            setisImageLoading(false)

        } catch (error) {
            openNotificationWithIcon('error', `Error uploading image ${error.message}`);
        }
    }

    return (
        <Drawer
            className='drawer-group-name-and-image'
            title={
                <div className="flex justify-between items-center">
                    <span className='DrawergoBack gap-6 pr-4 pointer'>
                        <IoArrowBack onClick={onChildrenDrawerClose} />
                    </span>
                    New group
                </div>
            }
            closable={false}
            onClose={onChildrenDrawerClose}
            visible={childrenDrawer}
            placement={'left'}
            width={"30%"}
        >
            <div className="groupImageUpload">
                <Image
                    alt="bruce wayne"
                    htmlWidth={250}
                    htmlHeight={250}
                    className="object-cover"
                    src={!isImageLoading ? groupImage : loadingGif}
                />
                <FormControl>
                    <Input.Group>
                        <label className="custom-file-upload">
                            <Input type="file" name='groupImage' onChange={uploadGroupImage} />
                            {isImageLoading ? "Uploading your image ...." : "Upload your profile image"}
                        </label>
                    </Input.Group>
                </FormControl>
            </div>
            <FormControl >
                <Input
                    autoFocus
                    type="text" name="email" placeholder="Group Subject" autoComplete='off'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </FormControl>
            <div className="submitSlectedUser finalSubmissionSelectedUsers">
                <span
                    className={`${groupChatLoading ? "groupSubmitBtnLoading" : "groupSubmitBtn"}`}
                    onClick={handleGroupCreationSubmmit}>
                    {groupChatLoading ? <AiOutlineLoading3Quarters /> : <TiTick />}
                </span>
            </div>
        </Drawer>
    )
}

export default DrawerGroupNameAndImage