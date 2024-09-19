
const emailEndpoint = {
    sendEmail: ({ email, userId }) => `/email/send-email?email=${email}&userId=${userId}`,
}

export default emailEndpoint