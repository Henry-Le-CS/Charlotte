
import userEnpoint from '$/configs/endpoint/user';
import { axiosInstance } from '$/http/axios-client.jsx';
const login = formData => axiosInstance({ formData: true }).post(userEnpoint.login('user'), formData)
const signup = formData => axiosInstance({ formData: true }).post(userEnpoint.register('user'), formData)

export { login, signup };
