import defaultAvatar from '$/assets/avatar-default.svg';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
const defaultBio = 'Vấn đề không phải là bạn có bị hạ gục hay không, mà là bạn có đứng dậy hay không.'
const Modal = ({ user, status }) => {
    const [isApear, setIsApear] = useState(true);
    const modalRef = useRef();

    useEffect(() => {
        if (typeof status === 'function') {
            status(isApear);
        }
    }, [isApear, status]);

    const handleClose = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsApear(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClose);
        return () => {
            document.removeEventListener('mousedown', handleClose);
        };
    }, []);

    return (
        isApear && user && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999] backdrop-blur-sm">
                <div className="flex justify-center items-end text-center min-h-screen sm:block">
                    <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <div ref={modalRef} className="inline-block text-left bg-[var(--navbar-dark-primary)] rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-[45rem] sm:w-full">
                        <div className="items-center w-full mr-auto ml-auto relative max-w-8xl md:px-12 lg:px-24">
                            <div className="grid grid-cols-1">
                                <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                                    <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                                        <img 
                                            src={user.avatar || defaultAvatar}
                                            className="flex-shrink-0 object-cover object-center w-32 h-32 mr-auto -mb-8 ml-auto rounded-full shadow-xl" 
                                            alt="profile" 
                                        />
                                        <p className="mt-10 text-4xl font-semibold leading-none text-white tracking-tighter lg:text-5xl">
                                            {user.username}
                                        </p>
                                        <p className="mt-5 leading-relaxed text-2xl text-center text-white">{user.email}</p>
                                        <p className="mt-5 leading-relaxed text-1xl text-center text-white">{user.bio || defaultBio}</p>
                                        <div className="w-full mt-8">
                                            <button className="flex text-center items-center justify-center w-full py-5 text-2xl font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Kết bạn
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

Modal.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        bio: PropTypes.string,
        email: PropTypes.string,
        avatar: PropTypes.string,
    }),
    status: PropTypes.func,
};

export default Modal;
