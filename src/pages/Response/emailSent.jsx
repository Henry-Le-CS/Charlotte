import { sendEmail } from '$/services/email';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
const EmailSent = () => {
    const location = useLocation();
    const email = location.state?.email;
    const options = location.state?.options;
    useEffect(() => {
        if (email) {
            sendEmail({ email, options })
                .then((response) => {
                    if (response.message) {
                        toast.success(response.message);
                    } else {
                        toast.error(`Email sending failed: ${response.message}`);
                    }
                })
                .catch((error) => {
                    toast.error(`Failed to send email: ${error.message || error}`);
                });
        }
    }, [email, options]);
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
            <div className="max-w-xl px-5 text-center">
                <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Check your inbox</h2>
                <p className="mb-2 text-lg text-zinc-500">
                    We are glad, that you’re with us! We’ve sent you a verification link to the email address 
                    {typeof email === 'string' && (
                        <span className="font-medium text-indigo-500"> {email}</span>
                    )}.
                </p>
                <a href="/user/login" className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Open the App →</a>
            </div>
        </div>
    );
};

export default EmailSent;
