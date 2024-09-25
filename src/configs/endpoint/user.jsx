const userEnpoint = {
    login: (user) => `/${user}/login`,
    logout: (userId) => `/user/logout?userId=${userId}`,
    register: (user) => `/${user}/register`,
    // UPDATE INFOMATION
    updateInfomation: (id) => `/user/${id}/updating`,
    search: (value) => `/user/search?value=${value}`
}

export default userEnpoint
