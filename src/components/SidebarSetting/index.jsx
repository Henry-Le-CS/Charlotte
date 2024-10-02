import { logout } from '$/services/user';
import PropTypes from "prop-types";
import { HiOutlineUser } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaWalletSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Notification from '../Notifications';
import styles from './index.module.scss';
const SidebarSetting = ({ userId }) => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        if (userId) {
            try {
                const results = await logout(userId);
                if (!results) {
                    toast.error('Logout failed');
                } else {
                    toast.success('You will be logged out now', results.message);
                    setTimeout(() => navigate('/user/login'), 3000)
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };
    return (
        <div className={`min-w-[50px] flex flex-col items-center justify-end py-5 ${styles.sidebar_container}`}>
                <HiOutlineUser />
                <Notification/>
                <IoIosHeartEmpty />
                <LiaWalletSolid />
                <IoSettingsOutline />
                <IoLogOutOutline onClick={handleLogout} />
            <div>
                <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-12 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--navbar-dark-secondary)]"></div>
                </label>
            </div>
        </div>
    )
}
SidebarSetting.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
export default SidebarSetting