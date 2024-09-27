
import defaultAvatar from '$/assets/avatar-default.svg';
import Notification from '$/components/Notifications';
import Search from '$/components/Search';
import { checkRequestSent } from '$/services/notification';
import { loadUser } from '$/services/user';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TbUserPlus, TbUsersPlus } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import UserStatus from '../UserStatus';
import styles from "./index.module.scss";
const ChatSideBar = () => {
    // const inputRef = useRef(null);
    const [isModal, setIsModal] = useState(false)
    const location = useLocation()
    const [isApear, setIsApear] = useState(false)
    const [lineLeft, setLineLeft] = useState('0');
    const [lineWidth, setLineWidth] = useState('0');
    const [searchData, setSearchData] = useState([])
    const [modalUser, setModalUser] = useState(null)
    const [requestSent, setRequestSent] = useState(false)
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        const headerLinks = document.querySelector(`.${styles.header_links}`);
        const activeElement = document.querySelector('#active');
        
        const updateLinePosition = (element) => {
            setLineLeft(element.offsetLeft + 'px');
            setLineWidth(element.offsetWidth + 'px');
        };
    
        const setActiveLink = () => {
            if (headerLinks) {
                const children = Array.from(headerLinks.children);
                const activeChild = children.find((child) => child.getAttribute('id') === activeElement.id);
    
                if (activeChild) {
                    updateLinePosition(activeChild);
                }
            }
        };
    
        const handleChildClick = (child) => () => updateLinePosition(child);
    
        if (headerLinks) {
            const children = Array.from(headerLinks.children);
            children.forEach((child) => {
                child.addEventListener('click', handleChildClick(child));
            });
        }
    
        setActiveLink();
    
        return () => {
            if (headerLinks) {
                const children = Array.from(headerLinks.children);
                children.forEach((child) => {
                    child.removeEventListener('click', handleChildClick(child));
                });
            }
        };
    }, [location]);

    useEffect(() => {
        const myProfile = async () => {
            try {
                const results = await loadUser();
                setUser(results?.metadata)
            } catch (error) {
                toast.error('User not found! ' + error?.response?.data?.message || error.message || error);
            }
        };

        myProfile();
    }, []);
    const handleApear = (state) => {
        if (state === true) {
            setIsApear(true)
        } else {
            setIsApear(false)
        }
    }
    const handleData = (metadata) => {
        setSearchData(metadata)
    }
    const handleModal = async (e, user) => {
        e.stopPropagation()
        setIsModal(true)
        setModalUser(user)
        try {
            const results = await checkRequestSent(user._id)
            if (results) setRequestSent(true)
        } catch (error) {
            setRequestSent(false)
            toast.error('Error occurred while checking request sent! ' + error?.response?.data?.message || error.message || error);
        }
    }
    const handleModalStatus = (status) => {
        if (status === false) {
            setIsModal(false)
        }
    }
    return (
        <div className={`${styles.container}`}>
                {/* Sidebar Header */}
                {user && <div className="w-full h-[150px] bubble-shadow p-3">
                    {/* Top Sidebar Header: Profile */}
                    <div className="flex h-[60px] justify-between items-center">
                        <div className="flex items-center">
                            <div className='relative size-[50px] pt-[5px]'>
                                <img src={user.avatar || defaultAvatar} alt="avatar" className="size-[40px] rounded-full object-cover" />
                                <UserStatus status='active' />
                            </div>
                            <h5 className="text-white font-mono min-w-[100px]">{user.username}</h5>
                        </div>
                        <div className="flex items-center">
                            <Notification />
                            <IoEllipsisHorizontal />
                        </div>
                    </div>
                    {/* Middle Sidebar Header: Tools */}
                    <div className="flex justify-center items-center">
                        <Search location={'users'} status={handleApear} data={handleData} />
                        <TbUserPlus/>
                        <TbUsersPlus />
                    </div>
                        {/* Bottom Sidebar Header: Options */}
                    <div className={styles.header_links}>
                        <span id='active'>Đang hoạt động</span>
                        <span id='favorite'>Yêu thích</span>
                        <span id='all'>Tất cả</span>
                        <div className={styles.header_links_line} style={{ left: lineLeft, width: lineWidth }}></div>
                    </div>
                </div>}
                <div className="h-full w-[305px] bubble-shadow overflow-scroll">
                {isApear ? (
                    searchData.length > 0 && searchData.map(user => (
                        <ul key={user._id} className="w-full mb-4" onClick={(e) => handleModal(e, user)}>
                            <li className="w-[60px] flex justify-center items-center">
                                <div className='relative size-[60px] pt-[10px]'>
                                    <img src={user.avatar || defaultAvatar} alt="avatar" className="size-[40px] rounded-full object-cover" />
                                    <UserStatus status={user.status === 'offline' ? 'inactive' : 'active'} />
                                </div>
                                <div className="w-full flex items-center justify-center flex-col px-4">
                                    <div className="w-full flex items-center justify-between">
                                        <h6>{user.username}</h6>
                                        <time dateTime={user.updatedAt}>{new Date(user.updatedAt).toLocaleDateString()}</time>
                                    </div>
                                    <p className="max-h-[20px] pr-[10px] overflow-hidden text-ellipsis">{user.email}</p>
                                </div>
                            </li>
                        </ul>
                    ))
                ) : (
                    searchData.length > 0 && searchData.map(user => (
                        <ul key={user._id} className="w-full mb-4">
                            <li className="w-[60px] flex justify-center items-center">
                                <div className='relative size-[60px] pt-[10px]'>
                                    <img src={user.avatar || defaultAvatar} alt="avatar" className="size-[40px] rounded-full object-cover" />
                                    <UserStatus status={user.status === 'offline' ? 'inactive' : 'active'} />
                                </div>
                                <div className="w-full flex items-center justify-center flex-col px-4">
                                    <div className="w-full flex items-center justify-between">
                                        <h6>{user.username}</h6>
                                        <time dateTime={user.updatedAt}>{new Date(user.updatedAt).toLocaleDateString()}</time>
                                    </div>
                                    <p className="max-h-[20px] pr-[10px] overflow-hidden text-ellipsis">{user.email}</p>
                                </div>
                            </li>
                        </ul>
                    ))
                )}

                </div>
                {isModal && modalUser !== null ? <Modal user={modalUser} status={handleModalStatus} isRequestSent={requestSent} /> : <></>}
            </div>
  );
};

ChatSideBar.propTypes = {
    userId: PropTypes.string,
};

export default ChatSideBar