
import userEnpoint from '$/configs/endpoint/user';
import { axiosInstance } from '$/http/axios-client.jsx';
const login = formData => axiosInstance({ formData: true }).post(userEnpoint.login('user'), formData)
const signup = formData => axiosInstance({ formData: true }).post(userEnpoint.register('user'), formData)
const search = value => axiosInstance({ formData: true }).post(userEnpoint.search(value))
export { login, search, signup };

