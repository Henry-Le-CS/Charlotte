import ChatContent from '$/components/ChatContent';
import ChatSidebar from '$/components/ChatSidebar';
const Chat = () => {
    return <div className='flex w-screen h-screen'>
        <ChatSidebar />
        <ChatContent />
    </div>
}
export default Chat
