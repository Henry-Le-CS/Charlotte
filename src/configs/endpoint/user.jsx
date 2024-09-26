const userEnpoint = {
    login: (user) => `/${user}/login`,
    logout: (userId) => `/user/logout?userId=${userId}`,
    register: (user) => `/${user}/register`,
    // UPDATE INFOMATION
    updateInfomation: (id) => `/user/${id}/updating`,

    load: (userId) => `/user?userId=${userId}`,
    search: (value) => `/user/search?${value}`,
    checkStatus: () => `/user/checkStatus`
}

export default userEnpoint
