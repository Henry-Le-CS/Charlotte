import { sendEmail } from "$/services/user";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const EmailSent = () => {
    const location = useLocation();
    const email = location.state?.email;
    const userId = location.state?.userId;
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        if (email && userId && !isVerifying) {
            setIsVerifying(true);
            sendEmail({ email, userId })
                .then((response) => {
                    setIsVerifying(false)
                    if (response.data.success) {
                        toast.success('Email verified successfully. Redirect to login...')
                        setTimeout(() => navigate('/user/login'), 2000)
                    } else {
                        console.error("Verification failed: ", response.data.message);
                    }
                })
                .catch((error) => {
                    setIsVerifying(false)
                    console.error("Failed to send email: ", error.message);
                });
        }
    }, [email, userId]);


    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
            <div className="max-w-xl px-5 text-center">
                <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Check your inbox</h2>
                <p className="mb-2 text-lg text-zinc-500">
                    We are glad, that you’re with us! We’ve sent you a verification link to the email address 
                    <span className="font-medium text-indigo-500"> {email}</span>.
                </p>
                <a href="/user/login" className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Open the App →</a>
            </div>
        </div>
    );
};

export default EmailSent;
