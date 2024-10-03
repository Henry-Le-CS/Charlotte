import defaultAvatar from '$/assets/default-dog.jpg';
import Search from '$/components/Search';
import { AiOutlinePhone, AiOutlineStar, AiOutlineVideoCamera } from "react-icons/ai";
import { useAppSelector } from '../../redux/hooks';
import UserStatus from '../UserStatus';
import styles from './index.module.scss';
const ChatHeader = ( ) => {
    const friend = useAppSelector(state => state.friend.friendOnChat)
    return (
        friend && <header className="bg-transparent bubble-shadow p-5 text-gray-700 min-h-[60px] flex">
                {/* Left Side Chat Header */}
              <div className="flex items-center justify-start min-w-[50%] pl-10">
                <div className="relative w-[50px] h-[50px] pt-[5px]">
                  <img src={friend.avatar || defaultAvatar} alt="" className="size-[40px] rounded-full object-cover" />
                  <UserStatus status={friend.status === 'online' ? 'active' : 'inactive'} />
                </div>
                <div className="flex flex-col items-center justify-start text-white">
                    <span className="text-4xl w-auto ml-[10px]"><b>{friend.username}</b></span>
                    {friend.status === 'online' ? <span className="pl-6 text-[var(--icon-color)]">Đang hoạt động</span> : <span className="pl-6 text-[var(--icon-color)]">Offline</span>}
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