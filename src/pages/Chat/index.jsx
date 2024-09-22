import ChatContent from '$/components/ChatContent';
import ChatSidebar from '$/components/ChatSidebar';
import styles from './index.module.scss';
const Chat = () => {
    return <div className='flex justify-center h-screen overflow-hidden'>
            <div className={styles.area}>
                <ul className={styles.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                </ul>
            </div>
        <ChatSidebar />
        <ChatContent />
    </div>
}
export default Chat
