import defaultAvatar from '$/assets/default-dog.jpg';
import { PropTypes } from 'prop-types';
import { useAppSelector } from "../../redux/hooks";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
	const user = useAppSelector(state => state.user.data);
	const { selectedFriend } = useAppSelector(state => state.friends);
	const fromMe = message.sender === user._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? user.avatar : selectedFriend?.avatar;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic || defaultAvatar} />
				</div>
			</div>
			<div className={`chat-bubble text-start text-white ${bubbleBgColor} ${shakeClass} pb-2 max-w-xs md:max-w-xl break-words`}>
				{message.message.split('\r\n').map((line, idx) => (
					<span key={idx}>
					{line}
					<br />
					</span>
				))}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;

Message.propTypes = {
    message: PropTypes.object.isRequired,
}
