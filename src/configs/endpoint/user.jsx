const userEnpoint = {
    // SIGN IN
    login: (user) => `/${user}/login`,
    // REGISTER
    register: (user) => `/${user}/register`,
    sendEmail: ({ email, userId }) => `/email/send-email?email=${email}&userId=${userId}`,
    // UPDATE INFOMATION
    updateInfomation: (id) => `/user/${id}/updating`,
    search: (value) => `/user/${value}`
}

export default userEnpoint
