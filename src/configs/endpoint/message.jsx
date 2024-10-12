const messageEnpoint = {
    search: (value) => `/message/search?${value}`,
    getMessages: (friendId) => `/message/?id=${friendId}`,
    sendMessage: (friendId) => `/message/?id=${friendId}`,
}

export default messageEnpoint
