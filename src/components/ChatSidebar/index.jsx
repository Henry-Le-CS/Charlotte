
import { search } from "$/services/user";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaBars } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./index.module.scss";
const ChatSideBar = () => {
    const [lineLeft, setLineLeft] = useState('0');
    const [lineWidth, setLineWidth] = useState('0');
    const location = useLocation();
    useEffect(() => {
        const chatSidebarHeading = document.querySelector(`.${styles.chat_sidebar_heading}`);

        const updateLinePosition = (element) => {
            setLineLeft(element.offsetLeft + 'px');
            setLineWidth(element.offsetWidth + 'px');
        };

        const setActiveLink = () => {
            const currentPath = location.pathname;
            if (chatSidebarHeading) {
                const children = Array.from(chatSidebarHeading.children);
                const activeChild = children.find((child) => child.getAttribute('href') === currentPath);

                if (activeChild) {
                    updateLinePosition(activeChild);
                }
            }
        };

        if (chatSidebarHeading) {
            const children = Array.from(chatSidebarHeading.children);
            children.forEach((child) => {
                child.addEventListener('click', () => updateLinePosition(child));
            });
        }

        setActiveLink(); 
        return () => {
            if (chatSidebarHeading) {
                const children = Array.from(chatSidebarHeading.children);
                children.forEach((child) => {
                    child.removeEventListener('click', () => updateLinePosition(child));
                });
            }
        };
    }, [location, lineLeft, lineWidth]);
    const group = () => {
        return <>
            <div className="h-full w-1/4 px-2 pt-2 flex items-center flex-col">
                <div className={`flex items-center justify-evenly ${styles.header_links}`}>
                    <span>All</span>
                    <span>1</span>
                </div>
                <div className={styles.chat_sidebar_heading_line} style={{ left: lineLeft, width: lineWidth }}></div>
            </div>
        </>
    }
    const { handleSubmit, formState: setValue } = useForm({
        defaultValues: {
            searchValue: ''
        }
    });
    
    const onSearch = async (data) => {
        const value = new FormData();

        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object' && data[key] !== null) {
                Object.keys(data[key]).forEach(subKey => {
                    if (data[key][subKey] !== '') {
                        setValue(`${key}.${subKey}`, data[key][subKey]);
                        value.append(`${key}[${subKey}]`, data[key][subKey]);
                    }
                });
            } else if (data[key] !== '') {
                setValue(key, data[key]); 
                value.append(key, data[key]);
            }
        });

        try {
            const results = await search(value);
            if(!results.data.length) toast.error('Không tìm thấy kết quả')
            toast.success(results.message);
        } catch (error) {
            toast.error('Lỗi tìm kiếm: ' + error.response.data.message || error.message || error);
        }
    };
    return (
        <div className="w-1/5 h-full overflow-hidden" style={{ backgroundColor: 'var(--primary-color)' }}>
            <div className="h-1/6 w-full shadow-lg">
                <div className="flex items-center h-1/2 w-full flex-row ">
                    <FaBars className="w-2/12 h-full p-6" />
                    <form className="relative" onSubmit={handleSubmit(onSearch)}>
                        <input
                            className={classNames('text-3xl border-none mt-2 block w-full h-50 px-4 py-3 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500')}
                            id="search"
                            type="search"
                            placeholder="Tìm kiếm"
                            {...search('search', { required: true, pattern: /^\S+@\S+$/i })}
                        />
                    </form>
                </div>
                <div className="flex-auto items-center h-1/2 px-3">
                    {group()}
                </div>
            </div>
            <div className="h-full mt-auto snap-y"></div>
        </div>
    )
}

export default ChatSideBar