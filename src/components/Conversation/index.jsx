
import defaultAvatar from '$/assets/default-dog.jpg';
import { PropTypes } from 'prop-types';
import { setSelectedFriend } from '../../features/friends.slice';
import { setIsMobile } from '../../features/user.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import UserStatus from '../UserStatus';
import styles from './index.module.scss';
export const Conversation = ({friend, lastIdx, emoji }) => {
    const selectedFriend = useAppSelector(state => state.friend.selectedFriend)
    const disPatch = useAppDispatch()
    const handleSelectedFriend = () => {
        disPatch(setIsMobile(true))
        disPatch(setSelectedFriend(friend))
    }
    const isSelected = selectedFriend?._id === friend._id
    return (
            <>
                <ul key={friend._id} className={`w-full mb-4  ${isSelected ? "bg-sky-500" : ""} ${styles.card_background}`} onClick={handleSelectedFriend}>
                    <li className="w-[60px] flex justify-center items-center">
                        <div className='relative size-[60px] pt-[10px]'>
                            <img src={friend.avatar || defaultAvatar} alt="avatar" className="size-[40px] rounded-full object-cover" />
                            <UserStatus status={friend.status === 'offline' ? 'inactive' : 'active'} />
                        </div>
                        <div className="w-full flex items-center justify-center flex-col px-4">
                            <div className="w-full flex items-center justify-between">
                                <h6>{friend.username}</h6>
                                <span className='text-xl'>{emoji}</span>
                                <time dateTime={friend.createdAt}>{new Date(friend.createdAt).toLocaleDateString()}</time>
                            </div>
                            <p className="max-h-[20px] w-full text-start pr-[10px] overflow-hidden text-ellipsis ">{friend.email}</p>
                        </div>
                    </li>
                </ul>
            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
            </>
    )
}

Conversation.propTypes = {
    friend: PropTypes.object.isRequired,
    lastIdx: PropTypes.number,
    emoji: PropTypes.string,
}
