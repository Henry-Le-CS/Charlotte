import ChatContent from '$/components/ChatContent';
import ChatSidebar from '$/components/ChatSidebar';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import SidebarSetting from '../../components/SidebarSetting';
import styles from './index.module.scss';
const Chat = () => {
    const location = useLocation()
    const userData = location.state?.userData;
    const userId = userData?.metadata._id;
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
        <SidebarSetting userId={userId} />
        <ChatSidebar />
        <ChatContent />
    </div>
}
Chat.propTypes = {
    userData: PropTypes.shape({
        id: PropTypes.string
    })
}
export default Chat
