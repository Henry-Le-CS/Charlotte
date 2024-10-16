import defaultAvatar from '$/assets/default-dog.jpg';
import Search from '$/components/Search';
import { AiOutlinePhone, AiOutlineStar, AiOutlineVideoCamera } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { setIsMobile } from '../../features/user.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import UserStatus from '../UserStatus';
import styles from './index.module.scss';
const ChatHeader = ( ) => {
    const disPatch = useAppDispatch()
    const isMobile = useAppSelector(state => state.user.isMobile)
    const { selectedFriend } = useAppSelector(state => state.friends)
    return (
      selectedFriend && <header className="bg-transparent bubble-shadow p-5 text-gray-700 min-h-[60px] w-full mb-[5px] flex">
                {/* Left Side Chat Header */}
              <div className={`flex items-center justify-start min-w-[50%] pl-10 ${styles.mobile_chat_header}`}>
                {isMobile && <FaArrowLeft className='text-white w-[40px] h-[40px] p-[10px] mr-[10px]' onClick={() => disPatch(setIsMobile(false))} />}
                <div className="relative w-[50px] h-[50px] pt-[5px]">
                  <img src={selectedFriend.avatar || defaultAvatar} alt="" className="size-[40px] rounded-full object-cover" />
                  <UserStatus status={selectedFriend.status === 'online' ? 'active' : 'inactive'} />
                </div>
                <div className="flex flex-col items-center justify-start text-white">
                    <span className="text-4xl w-auto ml-[10px]"><b>{selectedFriend.username}</b></span>
                    {selectedFriend.status === 'online' ? <span className="pl-6 text-[var(--icon-color)]">Đang hoạt động</span> : <span className="pl-6 text-[var(--icon-color)]">Offline</span>}
                </div>
              </div>
              {/* Right Side Chat Header */}
              <div className={`${styles.right_side_chat} flex justify-end items-center min-w-[50%]`}>
                <Search location={'messages'} />
                <AiOutlineStar />
                <AiOutlineVideoCamera />
                <AiOutlinePhone />
              </div>
        </header>
    )
}

export default ChatHeader