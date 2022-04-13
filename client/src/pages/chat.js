import React, { useState, useEffect } from 'react'
import axios from '../config/axios';
const Chat = () => {
    const [chats, setChats] = useState([]);
    const fetchChats = async () => {
        const { data } = await axios.get('chat/all');
        console.log(data)
        setChats(data.chats);
    }
    useEffect(() => {
        fetchChats()
    }, []);
    return (
        <div>{chats.map((chat, i) =>
            <div key={i}>
                <h1>{chat.chatName}</h1>
            </div>
        )}</div>
    )
}

export default Chat