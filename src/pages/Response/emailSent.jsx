import { sendEmail } from "$/services/user";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const EmailSent = () => {
    const location = useLocation();
    const email = location.state?.email;
    const userId = location.state?.userId;

    useEffect(() => {
        if (email && userId) {
            sendEmail({email, userId})
                .then((response) => {
                    console.log("Email sent successfully: ", response.data);
                })
                .catch((error) => {
                    console.error("Failed to send email: ", error.message);
                });
        }
    }, []);

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
