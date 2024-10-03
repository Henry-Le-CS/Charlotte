
import { axiosInstance } from '$/http/axios-client.jsx';
import notiEndpoint from '../configs/endpoint/notification';
const getNotifications = () => axiosInstance({ formData: false }).get(notiEndpoint.getNotifications())
const checkRequestSent= receiverId => axiosInstance({ formData: false}).get(notiEndpoint.checkRequestSent(receiverId))
const sendFriendRequest = receiverId => axiosInstance({ formData: false }).post(notiEndpoint.sendFriendRequest(receiverId))
const acceptFriendRequest = receiverId => axiosInstance({ formData: false }).post(notiEndpoint.acceptFriendRequest(receiverId))

export { acceptFriendRequest, checkRequestSent, getNotifications, sendFriendRequest };

