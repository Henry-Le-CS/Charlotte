
// import { search } from "$/services/user";
// import classNameNames from "classNamenames";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaBars } from "react-icons/fa6";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import styles from "./index.module.scss";
const ChatSideBar = () => {
    // const { handleSubmit, formState: setValue } = useForm({
    //     defaultValues: {
    //         searchValue: ''
    //     }
    // });
    
    // const onSearch = async (data) => {
    //     const value = new FormData();

    //     Object.keys(data).forEach(key => {
    //         if (typeof data[key] === 'object' && data[key] !== null) {
    //             Object.keys(data[key]).forEach(subKey => {
    //                 if (data[key][subKey] !== '') {
    //                     setValue(`${key}.${subKey}`, data[key][subKey]);
    //                     value.append(`${key}[${subKey}]`, data[key][subKey]);
    //                 }
    //             });
    //         } else if (data[key] !== '') {
    //             setValue(key, data[key]); 
    //             value.append(key, data[key]);
    //         }
    //     });

    //     try {
    //         const results = await search(value);
    //         if(!results.data.length) toast.error('Không tìm thấy kết quả')
    //         toast.success(results.message);
    //     } catch (error) {
    //         toast.error('Lỗi tìm kiếm: ' + error.response.data.message || error.message || error);
    //     }
    // };
    return (
        <nav className="bg-[var(--chat-sidebar-color)] shadow-lg h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 flex-col text-[var(--black-text-color)]">
            <div className="flex flex-wrap items-center cursor-pointer text-5xl">
                <div className="relative">
                    <img src='https://readymadeui.com/profile_2.webp' className="w-12 h-12 p-1 rounded-full border-2 border-gray-300" />
                    <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
                </div>

                <div className="ml-6">
                    <p className="text-sm">Hello</p>
                    <h6 className="text-lg">John Doe</h6> {/* Updated size */}
                </div>
            </div>

            <hr className="border-gray-500 mt-8" />

            <div className="my-8 flex-1">
                <h6 className="text-xl inline-block">Teams</h6> {/* Updated size */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="" className="w-[15px] h-[15px] float-right cursor-pointer ml-auto" viewBox="0 0 118.783 118.783">
                    <path d="M115.97 101.597 88.661 74.286a47.75 47.75 0 0 0 7.333-25.488c0-26.509-21.49-47.996-47.998-47.996S0 22.289 0 48.798c0 26.51 21.487 47.995 47.996 47.995a47.776 47.776 0 0 0 27.414-8.605l26.984 26.986a9.574 9.574 0 0 0 6.788 2.806 9.58 9.58 0 0 0 6.791-2.806 9.602 9.602 0 0 0-.003-13.577zM47.996 81.243c-17.917 0-32.443-14.525-32.443-32.443s14.526-32.444 32.443-32.444c17.918 0 32.443 14.526 32.443 32.444S65.914 81.243 47.996 81.243z"
                        data-original="#000000"></path>
                </svg>

                <ul className="mt-6 space-y-6">
                    <li className="flex items-center text-lg cursor-pointer"> {/* Updated size */}
                        <span className="relative inline-block mr-4">
                            <img src='https://readymadeui.com/profile_3.webp' className="w-10 h-10 p-1 rounded-full border-2 border-gray-300" />
                            <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
                        </span>
                        Peter Taylor
                        <span className="bg-red-500 min-w-[20px] min-h-[20px] px-1 flex items-center justify-center font-bold rounded-full ml-auto">1</span>
                    </li>
                    <li className="flex items-center text-lg cursor-pointer"> {/* Updated size */}
                        <span className="relative inline-block mr-4">
                            <img src='https://readymadeui.com/profile_4.webp' className="w-10 h-10 p-1 rounded-full border-2 border-gray-300" />
                            <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
                        </span>
                        Johne Words
                        <span className="bg-red-500 min-w-[20px] min-h-[20px] px-1 flex items-center justify-center font-bold rounded-full ml-auto">5</span>
                    </li>
                    <li className="flex items-center text-lg cursor-pointer"> {/* Updated size */}
                        <span className="relative inline-block mr-4">
                            <img src='https://readymadeui.com/profile_5.webp' className="w-10 h-10 p-1 rounded-full border-2 border-gray-300" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500 block absolute bottom-1 right-0"></span>
                        </span>
                        Alen Walwa
                    </li>
                    <li className="flex items-center text-lg cursor-pointer"> {/* Updated size */}
                        <span className="relative inline-block mr-4">
                            <img src='https://readymadeui.com/profile.webp' className="w-10 h-10 p-1 rounded-full border-2 border-gray-300" />
                            <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
                        </span>
                        Justin
                    </li>
                    <li className="flex items-center text-lg cursor-pointer"> {/* Updated size */}
                        <span className="relative inline-block mr-4">
                            <img src='https://readymadeui.com/team-1.webp' className="w-10 h-10 p-1 rounded-full border-2 border-gray-300" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500 block absolute bottom-1 right-0"></span>
                        </span>
                        Mark Adele
                    </li>
                    <li className="flex items-center text-lg cursor-pointer"> {/* Updated size */}
                        <span className="relative inline-block mr-4">
                            <img src='https://readymadeui.com/team-2.webp' className="w-10 h-10 p-1 rounded-full border-2 border-gray-300" />
                            <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
                        </span>
                        Ammie Kolhe
                        <span className="bg-red-500 min-w-[20px] min-h-[20px] px-1 flex items-center justify-center font-bold rounded-full ml-auto">2</span>
                    </li>
                    <li className="flex items-center text-lg cursor-pointer"> {/* Updated size */}
                        <span className="relative inline-block mr-4">
                            <img src='https://readymadeui.com/team-3.webp' className="w-10 h-10 p-1 rounded-full border-2 border-gray-300" />
                            <span className="h-3 w-3 rounded-full bg-green-600 block absolute bottom-1 right-0"></span>
                        </span>
                        Piterson
                    </li>
                    <li className="flex items-center text-lg cursor-pointer"> {/* Updated size */}
                        <span className="relative inline-block mr-4">
                            <img src='https://readymadeui.com/team-4.webp' className="w-10 h-10 p-1 rounded-full border-2 border-gray-300" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500 block absolute bottom-1 right-0"></span>
                        </span>
                        Angue Watson
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default ChatSideBar