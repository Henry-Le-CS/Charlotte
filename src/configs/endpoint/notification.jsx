const notiEndpoint = {
    getNotifications: () => `notification/`,
    checkRequestSent: (receiverId) => `/notification/checkRequest?receiverId${receiverId}&status=sent&type=request`,
    sendFriendRequest: (receiverId) => `/notification/send-friend-request?receiverId=${receiverId}`,
    acceptFriendRequest: (receiverId) => `/notification/accept-friend-request?receiverId=${receiverId}`,
}

export default notiEndpoint
