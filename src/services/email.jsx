
import emailEndpoint from '$/configs/endpoint/email';
import { axiosInstance } from '$/http/axios-client.jsx';
const sendEmail = ({ email, options }) => axiosInstance({ formData: true }).get(emailEndpoint.sendEmail({ email, options }), { timeout: 180000 });
export { sendEmail };

