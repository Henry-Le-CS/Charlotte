
import emailEndpoint from '$/configs/endpoint/email';
import { axiosInstance } from '$/http/axios-client.jsx';
const sendEmail = ({ email, userId }) => axiosInstance({ formData: true }).get(emailEndpoint.sendEmail({ email, userId }), { timeout: 180000 });
export { sendEmail };

