const userEnpoint = {
    // SIGN IN
    login: (user) => `/${user}/login`,
    // REGISTER
    register: (user) => `/${user}/register`,

    // UPDATE INFOMATION
    updateInfomation: (id) => `/user/${id}/updating`,
}

export default userEnpoint
