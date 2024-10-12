import ChatContent from '$/components/ChatContent';
import ChatSidebar from '$/components/ChatSidebar';
import { checkStatus } from '$/services/user';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarSetting from '../../components/SidebarSetting';
import { setUser } from '../../features/user.slice';
import { useAppDispatch } from '../../redux/hooks';
import styles from './index.module.scss';
const Chat = () => {
    const [status, setStatus] = useState(false);
    const location = useLocation();
    const disPatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = location.state?.userData;
    function getCookieValue(cookieName) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
          
          if (cookie.startsWith(`${cookieName}=`)) {
            return cookie.substring(cookieName.length + 8, cookieName.length + 32)
          }
        }
        
        return null;
      }
    const userId = userData?.metadata?._id || getCookieValue('x-client-id')
    if (userData) {
        disPatch(setUser(userData))
    }

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                await checkStatus();
                setStatus(true)
            } catch (error) {
                toast.error('You are not logging! ' + error?.response?.data?.message || error.message || error);
                setStatus(false)
                setTimeout(() => navigate('/user/login'), 1500)
            }
        };

        fetchStatus();
    }, [navigate]);
    
    
    return (
        status && (
            <div className='flex static justify-center h-screen overflow-hidden'>
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
                <SidebarSetting userId={userId}/>
                <ChatSidebar />
                <ChatContent />
            </div>
        )
    );
};
export default Chat;
