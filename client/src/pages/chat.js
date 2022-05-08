import ChatViewBody from '../components/ChatViewBody';
import ChatViewFooter from '../components/ChatViewFooter';
import ChatViewHeader from '../components/ChatViewHeader';

const Chat = () => {
    return (
        <>
            <ChatViewHeader />
            <ChatViewBody messages={null} />
            <ChatViewFooter />
        </>
    )
}

export default Chat