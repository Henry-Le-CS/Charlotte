import logo from '$/assets/banner.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CgMenuMotion, CgUser } from "react-icons/cg";
import HeaderLinks from '../HeaderLinks';
import RouterLinks from '../RouterLinks';
import styles from './Header.module.scss';
const Header = ({ children }) => {
    const [background, setBackground] = useState('bg-transparent');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                setBackground('bg-[#a6ddf7]');
            } else {
                setBackground('bg-transparent');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={`w-screen fixed top-0 left-0 flex items-center justify-around shadow-md transition-all duration-500 ${background} ${styles.header}`}>
                <CgMenuMotion />
                <div className="w-[300px]">
                    <RouterLinks id='logo' to='/'>
                        <img className={`w-[200px] ${styles.header_logo}`} src={logo} alt="Logo" />
                    </RouterLinks>
                    <RouterLinks className={`${styles.header_logo_mobile}`} to='/'>
                        <b>Home</b>
                    </RouterLinks>
                </div>
                <HeaderLinks />
                <div className={`h-10 flex items-center justify-between w-[300px] ${styles.header_registration}`}>
                    <RouterLinks to='/user/login' className="w-[40%]">ĐĂNG NHẬP</RouterLinks>
                    <div className={styles.header_registration_button}>
                        <RouterLinks to='/user/register'>Đăng ký</RouterLinks>
                        <RouterLinks to='/user/register'>Đăng ký</RouterLinks>
                    </div>
                </div>
                <CgUser />
            </div>
            {children}
        </>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Header;
