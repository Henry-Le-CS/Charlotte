
import ririka from '$/assets/profile.jpg';
import { search } from "$/services/user";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiBell } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { TbUserPlus, TbUsersPlus } from "react-icons/tb";
import { toast } from "react-toastify";
import UserStatus from '../UserStatus';
import styles from "./index.module.scss";
const ChatSideBar = () => {
    const inputRef = useRef(null);
    const [lineLeft, setLineLeft] = useState('0');
    const [lineWidth, setLineWidth] = useState('0');
    useEffect(() => {
        const headerLinks = document.querySelector(`.${styles.header_links}`);

        const updateLinePosition = (element) => {
            setLineLeft(element.offsetLeft + 'px');
            setLineWidth(element.offsetWidth + 'px');
        };

        const setActiveLink = () => {
            const currentPath = location.pathname;
            if (headerLinks) {
                const children = Array.from(headerLinks.children);
                const activeChild = children.find((child) => child.getAttribute('href') === currentPath);

                if (activeChild) {
                    updateLinePosition(activeChild);
                }
            }
        };

        if (headerLinks) {
            const children = Array.from(headerLinks.children);
            children.forEach((child) => {
                child.addEventListener('click', () => updateLinePosition(child));
            });
        }

        setActiveLink(); 
        return () => {
            if (headerLinks) {
                const children = Array.from(headerLinks.children);
                children.forEach((child) => {
                    child.removeEventListener('click', () => updateLinePosition(child));
                });
            }
        };
    }, [location, lineLeft, lineWidth]);
    const { handleSubmit, register, setValue } = useForm({
        defaultValues: {
          searchValue: ''
        }
      });
    
      const onSearch = async (data) => {
        const formData = new FormData();
    
        Object.keys(data).forEach((key) => {
          if (data[key] !== '') {
            setValue(key, data[key]);
            formData.append(key, data[key]);
          }
        });
    
        try {
          const results = await search(formData);
          if (!results.data.length) {
            toast.error('Không tìm thấy kết quả');
          } else {
            toast.success(results.message);
          }
        } catch (error) {
          toast.error('Lỗi tìm kiếm: ' + (error.response?.data?.message || error.message || error));
        }
      };
      const handleFocusInput = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
    return (
        <div className={`${styles.container}`}>
                {/* Sidebar Header */}
                <div className="w-full h-[150px] bubble-shadow p-3">
                    {/* Top Sidebar Header: Profile */}
                    <div className="flex h-[60px] justify-between items-center">
                        <div className="flex items-center">
                            <div className='relative size-[50px] pt-[5px]'>
                                <img src={ririka} alt="" className="size-[40px] rounded-full object-cover" />
                                <UserStatus status='active' />
                            </div>
                            <h5 className="text-white font-mono">Shibayama Ririka</h5>
                        </div>
                        <div className="flex items-center">
                            <BiBell />
                            <IoEllipsisHorizontal />
                        </div>
                    </div>
                    {/* Middle Sidebar Header: Tools */}
                    <div className="flex justify-center items-center">
                        <div>
                            <form onSubmit={handleSubmit(onSearch)} className={styles.search}>
                                <input
                                    type="text"
                                    placeholder=" "
                                    {...register('searchValue')}
                                    ref={inputRef}
                                />
                                <div>
                                    <svg>
                                    <use xlinkHref="#path" />
                                    </svg>
                                </div>
                            </form>
                                    
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 28" id="path">
                                    <path d="M32.9418651,-20.6880772 C37.9418651,-20.6880772 40.9418651,-16.6880772 40.9418651,-12.6880772 C40.9418651,-8.68807717 37.9418651,-4.68807717 32.9418651,-4.68807717 C27.9418651,-4.68807717 24.9418651,-8.68807717 24.9418651,-12.6880772 C24.9418651,-16.6880772 27.9418651,-20.6880772 32.9418651,-20.6880772 L32.9418651,-29.870624 C32.9418651,-30.3676803 33.3448089,-30.770624 33.8418651,-30.770624 C34.08056,-30.770624 34.3094785,-30.6758029 34.4782612,-30.5070201 L141.371843,76.386562" transform="translate(83.156854, 22.171573) rotate(-225.000000) translate(-83.156854, -22.171573)"></path>
                                </symbol>
                            </svg>
                        </div>
                        <TbUserPlus onClick={handleFocusInput}/>
                        <TbUsersPlus />
                    </div>
                        {/* Bottom Sidebar Header: Options */}
                    <div className={styles.header_links}>
                        <span>Đang hoạt động</span>
                        <span>Yêu thích</span>
                        <span>Tất cả</span>
                        <div className={styles.header_links_line} style={{ left: lineLeft, width: lineWidth }}></div>
                    </div>
                </div>
                <div className="h-full w-[305px] bubble-shadow overflow-scroll">
                    <ul className="">
                        <li className="w-[60px] flex justify-center items-center">
                            <div className='relative size-[60px] pt-[10px]'>
                                <img src="https://wallpaperaccess.com/full/5665706.jpg" alt="" className="size-[40px] rounded-full object-cover" />
                                <UserStatus status='active' />
                            </div>
                            <div className="w-full flex items-center justify-center flex-col px-4">
                                <div className="w-full flex items-center justify-between">
                                    <h6>Thầy Lỏ</h6>
                                    <time dateTime="">9:00</time>
                                </div>
                                <p className="max-h-[20px] pr-[10px] overflow-hidden text-ellipsis">Trong quá trình học, nếu có nội dung nào không rõ, các bạn đặt câu hỏi để tui giải thích. Hoặc sau buổi học, có thể hỏi qua tin nhắn hoặc gọi điện thoại</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
  );
};

export default ChatSideBar