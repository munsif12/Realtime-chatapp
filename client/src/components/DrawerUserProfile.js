import React, { useEffect, useState } from 'react'
import { Drawer, Dropdown, Menu, Modal } from 'antd'
import { IoArrowBack } from "react-icons/io5";
import { FormControl, Image, Input } from '@vechaiui/react';
import { updateUser } from '../redux/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import loadingGif from '../assets/images/loadingGif.gif'
import openNotificationWithIcon from './Notification';
import uploadImageToCloudinary from '../config/uploadImageToCloudnary';
import { AiFillCamera } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { HiOutlineCheck } from "react-icons/hi";


function DrawerUserProfile({ visible, setVisible }) {
    const dispatch = useDispatch()
    const { user, error } = useSelector(state => state.auth)
    const [userName, setUserName] = useState({
        value: user.name,
        active: false
    });
    const [userAbout, setUserAbout] = useState({
        value: 'this is dummmy text',
        active: false
    });
    const [showImageOverlay, setShowImageOverlay] = useState(false);
    const [groupImage, setGroupImage] = useState(user.profileImage);
    const [isImageLoading, setisImageLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    function handleSettings(key) {
        switch (key) {
            case 'viewPhoto':
                showModal()
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
    useEffect(() => {
        if (error.success) {
            openNotificationWithIcon('success', error.message);
        }
    }, [error]);
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
    const ToggleEditNameButton = (cb) => {
        setUserName(p => ({ ...p, active: !userName.active }))

        if (typeof cb === 'function') cb()
    }
    const ToggleEditAboutButton = (cb) => {
        setUserAbout(p => ({ ...p, active: !userAbout.active }))
        if (typeof cb === 'function') cb()
    }

    const updateUserNewName = async () => {
        if (userName.value === user.name) {
            openNotificationWithIcon('error', 'You have not changed your name');
            return
        }
        dispatch(updateUser({ name: userName.value }))
    }


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
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
                        src={!isImageLoading ? groupImage : loadingGif}
                    />
                </div>
                <div className="userUpdateAbheFields">
                    <div className="userProfileEditName">
                        <p className='mb-1 p-0 mt-0 userProfileName'>Your name</p>
                        <div className="editUserProfileName" onClick={() => { }}>
                            <FormControl className='p-0'>
                                <Input
                                    className='userProfileNameEditInput'
                                    autoFocus
                                    type="text" name="email" placeholder="Group Subject" autoComplete='off'
                                    value={userName.value}
                                    onChange={(e) => userName.active && setUserName(p => ({ ...p, value: e.target.value }))}
                                />
                            </FormControl>
                            {
                                userName.active ? (
                                    <HiOutlineCheck className="editIconUserProfile" onClick={() => ToggleEditNameButton(updateUserNewName)} />
                                ) : (
                                    <MdEdit className="editIconUserProfile" onClick={ToggleEditNameButton} />
                                )
                            }
                        </div>
                    </div>
                    <div className="">
                        <p className=' p-0 mt-0 userNameAlertMessage'>This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
                    </div>
                    <div className="userProfileEditName">
                        <p className='mb-1 p-0 mt-0 userProfileName'>About</p>
                        <div className="editUserProfileName" onClick={() => { }}>
                            <FormControl className='p-0'>
                                <Input
                                    className='userProfileNameEditInput'
                                    autoFocus
                                    type="text" name="email" placeholder="Group Subject" autoComplete='off'
                                    value={userAbout.value}
                                    onChange={(e) => userAbout.active && setUserAbout(p => ({ ...p, value: e.target.value }))}
                                />
                            </FormControl>
                            {
                                userAbout.active ? (
                                    <HiOutlineCheck className="editIconUserProfile" onClick={() => ToggleEditAboutButton(updateUserNewName)} />
                                ) : (
                                    <MdEdit className="editIconUserProfile" onClick={ToggleEditAboutButton} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </Drawer>
            {
                isModalVisible && (
                    <Modal
                        title="Profile Image"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                        closable={false}
                    >
                        <div className="userViewImageCont">
                            <Image
                                alt="bruce wayne"
                                htmlWidth={"100%"}
                                htmlHeight={"100%"}
                                className="object-cover userViewImage"
                                src={groupImage || user.profileImage}

                            />
                        </div>
                    </Modal>
                )
            }
        </div>
    )
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
export default DrawerUserProfile