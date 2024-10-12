import messageEnpoint from '$/configs/endpoint/message';
import { axiosInstance } from '$/http/axios-client.jsx';
const searchMessages = value => axiosInstance({ formData: false }).get(messageEnpoint.search(value))
const getMessages = (friendId) => axiosInstance({ formData: false}).get(messageEnpoint.getMessages(friendId))
const sendMessages = (friendId, formData) => axiosInstance({ formData: true}).post(messageEnpoint.sendMessage(friendId), formData)
export { getMessages, searchMessages, sendMessages };

