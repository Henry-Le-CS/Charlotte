const notiEndpoint = {
    getNotifications: () => `notifications/`,
    checkRequestSent: (receiverId) => `/notifications/checkRequest?receiverId=${receiverId}&status=sent&type=request`,
    sendFriendRequest: (receiverId) => `/notifications/send-friend-request?receiverId=${receiverId}`,
    acceptFriendRequest: (receiverId) => `/notifications/accept-friend-request?receiverId=${receiverId}`,
}

export default notiEndpoint
