import notificationSound from "$/assets/sounds/notification.mp3";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSocketContext } from '../../contexts/socketContext';
import { setMessages } from "../../features/friends.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, selectedFriend } = useAppSelector(state => state.friend);
	const disPatch = useAppDispatch()

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			if (selectedFriend?._id !== newMessage.sender) toast.success(`Bạn có một tin nhắn mới`)
				
			if (selectedFriend._id === newMessage.sender) disPatch(setMessages([...messages, newMessage]));
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
