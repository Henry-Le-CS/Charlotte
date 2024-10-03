import ChatContent from '$/components/ChatContent';
import ChatSidebar from '$/components/ChatSidebar';
import { checkStatus } from '$/services/user';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import SidebarSetting from '../../components/SidebarSetting';
import { setUser } from '../../features/user.slice';
import { useAppDispatch } from '../../redux/hooks';
import styles from './index.module.scss';
const Chat = () => {
    const [status, setStatus] = useState(false);
    const [socket, setSocketOn] = useState(null);
    const location = useLocation();
    const disPatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = location.state?.userData;
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                await checkStatus();
                setStatus(true)
                 // Initialize Socket.IO connection after successful status check
                 const newSocket = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
                    query: { userId: userData?._id || getCookieValue('x-client-id') },
                    withCredentials: true,
                });
                setSocketOn(newSocket);
                newSocket.on('connect', () => {
                    console.log('Socket connected:', newSocket.id);
                });

                newSocket.on('disconnect', () => {
                    console.log('Socket disconnected');
                });

                return () => {
                    if (newSocket) newSocket.disconnect();
                };
            } catch (error) {
                toast.error('You are not logging! ' + error?.response?.data?.message || error.message || error);
                setStatus(false)
                setTimeout(() => navigate('/user/login'), 1500)
            }
        };

        fetchStatus();
    }, [navigate]);
    
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
    return (
        status && (
            <div className='flex justify-center h-screen overflow-hidden'>
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
                <ChatContent socket={socket} />
            </div>
        )
    );
};

Chat.propTypes = {
    userData: PropTypes.shape({
        id: PropTypes.string,
    }),
};

export default Chat;
