import messageEnpoint from '$/configs/endpoint/message';
import { axiosInstance } from '$/http/axios-client.jsx';
const searchMessages = value => axiosInstance({ formData: false }).get(messageEnpoint.search(value))

export { searchMessages };

