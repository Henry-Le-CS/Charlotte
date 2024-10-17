
const emailEndpoint = {
    sendEmail: ({ email, options }) => `/email/send-email?email=${email}&options=${options}`,
}

export default emailEndpoint