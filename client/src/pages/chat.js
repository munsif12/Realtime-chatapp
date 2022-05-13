import ChatViewBody from '../components/ChatViewBody';
import ChatViewFooter from '../components/ChatViewFooter';
import ChatViewHeader from '../components/ChatViewHeader';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import openNotificationWithIcon from '../components/Notification';



const Chat = () => {
    const { loading, currSelectedChat, error } = useSelector(state => state.chats)

    useEffect(() => {
        if (error.message !== '') openNotificationWithIcon('error', error.message)
    }, [error.status, error.message]);

    if (Object.keys(currSelectedChat).length <= 0) return message('Please Select a Chat')
    if (loading) return message('Loading...')
    return (
        <>
            <ChatViewHeader />
            <ChatViewBody messages={null} />
            <ChatViewFooter />
        </>
    )
}

export default Chat

const message = (msg) => (
    <div className="loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <h1>{msg}</h1>
    </div>
)