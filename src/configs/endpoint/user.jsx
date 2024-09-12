const userEnpoint = {
    // SIGN IN
    logining: (user) => `/${user}/logining`,
    // REGISTER
    register: (user) => `/${user}/register`,

    // UPDATE INFOMATION
    updateInfomation: (id) => `/user/${id}/updating`,
}

export default userEnpoint
