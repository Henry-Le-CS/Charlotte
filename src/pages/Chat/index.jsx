import ChatContent from '$/components/ChatContent';
import ChatSidebar from '$/components/ChatSidebar';
const Chat = () => {
    return <div className='flex h-screen overflow-hidden'>
        <ChatSidebar />
        <ChatContent />
    </div>
}
export default Chat
