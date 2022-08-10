import React, { useEffect, useState } from 'react'
import { Drawer, Dropdown, Menu } from 'antd'
import { IoArrowBack } from "react-icons/io5";
import { FormControl, Image, Input } from '@vechaiui/react';
import { useSelector, useDispatch } from 'react-redux';
import loadingGif from '../assets/images/loadingGif.gif'
import openNotificationWithIcon from './Notification';
import uploadImageToCloudinary from '../config/uploadImageToCloudnary';
import { AiFillCamera } from "react-icons/ai";

function DrawerUserProfile({ visible, setVisible }) {
    const { user } = useSelector(state => state.auth)
    const [userName, setUserName] = useState(user.name);
    const [showImageOverlay, setShowImageOverlay] = useState(false);
    const [groupImage, setGroupImage] = useState('');
    const [isImageLoading, setisImageLoading] = useState(false)
    const onClose = () => setVisible(false);
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
    const imageOverLayStyle = {
        cursor: 'pointer',
        backgroundColor: 'rgba(0,0,0,0.5)',
        transition: 'opacity 0.5s ease-in-out',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: 'white',
    }

    function handleSettings(key) {
        switch (key) {
            case 'viewPhoto':
                console.log('view photo')
                break;
            case 'uploadPhoto':
                console.log('uploadPhoto')
                break;
            case 'removePhoto':
                console.log('removePhoto')
                break;
            default:
                break;
        }
    }

    const menu = (
        <Menu
            onClick={(e) => handleSettings(e.key)}
            className='dropDownSettings pt-5 pb-5 text-2xl text-black'
            items={[
                {
                    label: <span>View Photo</span>,
                    key: 'viewPhoto',
                },
                {
                    label: <FormControl>
                        <Input.Group>
                            <label className="custom-file-upload">
                                <Input type="file" name='groupImage' onChange={uploadGroupImage} />
                                {isImageLoading ? "Uploading your image ...." : "Upload your profile image"}
                            </label>
                        </Input.Group>
                    </FormControl>,
                    key: "uploadPhoto",
                },
                {
                    label: <span >Remove Photo</span>,
                    key: 'removePhoto',
                },
            ]}
        />
    );
    useEffect(() => {
        console.log('User Profile Drawer :: Mounted')
        return () => {
            console.log('User Profile Drawer :: Unounted')
        };
    }, []);
    return (
        <div className="userProfileDrawer ">
            <Drawer
                title={
                    <div className="flex justify-between items-center">
                        <span className='DrawergoBack gap-6 pr-4 pointer'>
                            <IoArrowBack onClick={onClose} />
                        </span>
                        Profile
                    </div>
                }
                placement={'left'}
                width={"30%"}
                onClose={onClose}
                visible={visible}
                closable={false}
            >
                <div className="groupImageUpload userProfile">
                    <Dropdown overlay={menu} trigger={['contextMenu', 'click']}>
                        <div className='userProfileImageOverlay'
                            style={showImageOverlay ? imageOverLayStyle : {}}
                            onMouseEnter={() => setShowImageOverlay(true)}
                            onMouseLeave={() => setShowImageOverlay(false)}
                        >
                            {showImageOverlay && <div className='imageOverlayContent'>
                                <AiFillCamera className='profileImageOverlayIcons' />
                                <p className='m-0 p-0 imageOverlaychangeImage'> Change Profile photo</p>
                            </div>
                            }
                        </div>
                    </Dropdown>
                    <Image
                        alt="bruce wayne"
                        htmlWidth={250}
                        htmlHeight={250}
                        className="object-cover"
                        src={!isImageLoading ? user.profileImage : loadingGif}
                    />
                </div>
                <div className="userUpdateAbheFields">
                    <div className="userProfileEditName">
                        <p className='mb-1 p-0 mt-0 userProfileName'>Your name</p>
                        <FormControl className='p-0'>
                            <Input
                                className='userProfileNameEditInput'
                                autoFocus
                                type="text" name="email" placeholder="Group Subject" autoComplete='off'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </FormControl>
                    </div>
                    <div className="">
                        <p className=' p-0 mt-0 userNameAlertMessage'>This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
                    </div>
                    <div className="userProfileEditName">
                        <p className='mb-1 p-0 mt-0 userProfileName'>About</p>
                        <FormControl className='p-0'>
                            <Input
                                className='userProfileNameEditInput'
                                autoFocus
                                type="text" name="email" placeholder="Group Subject" autoComplete='off'
                                value={'this is dummy about text' || userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </FormControl>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default DrawerUserProfile