import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import callApi from '../apiCalls';

function DrawerStarredMessages({ visible, setVisible }) {
    const [starredMessages, setStarredMessages] = useState([])
    useEffect(() => {
        console.log('Starred Message Drawer :: Mounted')
        return () => {
            console.log('Starred Message Drawer:: Unounted')
        };
    }, []);
    async function getAllStarredMessages() {
        try {
            const data = await callApi.apiMethod('starredMessages', 'GET', null, null);
            setStarredMessages(data.starredMessages);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllStarredMessages()
    }, []);
    const onClose = () => setVisible(!visible)
    return (
        <div className="starredMessagesSideDrawer">
            <Drawer
                title={
                    <div className="flex justify-between items-center">
                        <span className='DrawergoBack gap-6 pr-4 pointer'>
                            <IoArrowBack onClick={onClose} />
                        </span>
                        Starred messages
                    </div>
                }
                placement={'left'}
                width={"30%"}
                onClose={onClose}
                visible={visible}
                closable={false}
            >


                <div className="starredMessages">
                    <h1>Hello Starred Drawer</h1>
                </div>
                {
                    starredMessages.map((message, index) => {
                        return (
                            <div key={index} className="starredMessage">
                                <h1>{message.message}</h1>
                            </div>
                        )
                    })
                }
            </Drawer>
        </div>
    )
}

export default DrawerStarredMessages