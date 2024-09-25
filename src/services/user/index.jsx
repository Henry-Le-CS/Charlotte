
import userEnpoint from '$/configs/endpoint/user';
import { axiosInstance } from '$/http/axios-client.jsx';
const login = formData => axiosInstance({ formData: true }).post(userEnpoint.login('user'), formData)
const logout = userId => axiosInstance({ formData: false }).get(userEnpoint.logout(userId))
const signup = formData => axiosInstance({ formData: true }).post(userEnpoint.register('user'), formData)
const searchUser = value => axiosInstance({ formData: false }).get(userEnpoint.search(value))
const checkStatus = () => axiosInstance({ formData: false}).get(userEnpoint.checkStatus())
export { checkStatus, login, logout, searchUser, signup };

