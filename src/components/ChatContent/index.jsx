import defaultDog from '$/assets/default-dog.jpg';
import { acceptFriendRequest } from '$/services/notification';
import { loadUser } from '$/services/user';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { saveNotis, setLoading } from "../../features/notifications.slice";
import { setRequestedUser } from '../../features/requested.user';
import { setUser } from '../../features/user.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Messages from '../Chat/Messages';
import ChatHeader from './../ChatHeader/index';
import ChatInput from './../ChatInput/index';
const ChatContent = () => {
    const isNotisLoading = useAppSelector(state => state.notis.isLoading)
    const requestedUser = useAppSelector(state => state.requestedUser.user)
    const notisData = useAppSelector(state => state.notis.data?.metadata?.notisWithSender)

    const disPatch = useAppDispatch()
    const handleRenderContainer = () => {
      if (isNotisLoading) {
        return (
          requestedUser && 
          <div className="w-[60%] h-[70%] mx-auto items-center justify-center flex flex-col bg-transparent dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="w-[80%] border-b px-4 pb-6">
            <div className="text-center my-4">
              <img
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src={requestedUser.avatar || defaultDog}
                alt="Profile"
              />
              <div className="py-2">
                <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{requestedUser.username}</h3>
                <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    />
                  </svg>
                  Ho Chi Minh, Viet Nam
                </div>
              </div>
            </div>
            <div className="flex gap-2 px-2">
              <button onClick={() => handleAcceptFriendRequest(requestedUser._id)} className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                Chấp nhận
              </button>
              <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                Nhắn tin
              </button>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
              <svg
                className="h-6 w-6 text-gray-600 dark:text-gray-400"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                />
              </svg>
              <span>
                <strong className="text-black dark:text-white">12</strong> Followers you know
              </span>
            </div>
            <div className="flex">
              <div className="flex justify-end mr-2">
                <img
                  className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Follower"
                />
                <img
                  className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                  src="https://randomuser.me/api/portraits/women/31.jpg"
                  alt="Follower"
                />
                <img
                  className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                  src="https://randomuser.me/api/portraits/men/33.jpg"
                  alt="Follower"
                />
                <img
                  className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Follower"
                />
                <img
                  className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                  src="https://randomuser.me/api/portraits/men/44.jpg"
                  alt="Follower"
                />
                <img
                  className="border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2"
                  src="https://randomuser.me/api/portraits/women/42.jpg"
                  alt="Follower"
                />
                <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-10 w-10">
                  +999
                </span>
              </div>
            </div>
          </div>
        </div>
        
        )
      } else {
        return (
          <div className='fixed bottom-0 max-w-[1010px] right-0 ml-[355px] flex flex-col justify-center h-full w-full'>
            <ChatHeader />
            <Messages />
            <ChatInput />
          </div>
        )
      }
    }

    const handleAcceptFriendRequest = async (userId) => {
      try {
        await acceptFriendRequest(userId)
        disPatch(setLoading(false))
        disPatch(setRequestedUser(null))
        const afterAccept = notisData.filter(noti => noti.status !== 'accepted')
        disPatch(saveNotis(afterAccept))
        const user = await loadUser()
        disPatch(setUser(user))
        toast.success('Đã kết bạn')
      } catch (error) {
        toast.error(error.message)
      }
    }
    return (
      <div className="w-full relative">
        {handleRenderContainer()}
      </div>
    );
  };
  
  ChatContent.propTypes = {
    socket: PropTypes.object
  }
  
  export default ChatContent;
  