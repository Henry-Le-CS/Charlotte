import logo from '$/assets/banner.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
            <div className={`w-screen fixed top-0 left-0 flex items-center justify-around shadow-md transition-all duration-500 ${background}`}>
                <div className="w-[300px]">
                    <RouterLinks id='logo' to='/'>
                        <img className="w-[200px]" src={logo} alt="Logo" />
                    </RouterLinks>
                </div>
                <HeaderLinks />
                <div className="h-10 flex items-center justify-between w-[300px]">
                    <RouterLinks to='/user/login' className="w-[40%]">ĐĂNG NHẬP</RouterLinks>
                    <div className={styles.header_registration_button}>
                        <RouterLinks to='/user/register'>Đăng ký</RouterLinks>
                        <RouterLinks to='/user/register'>Đăng ký</RouterLinks>
                    </div>
                </div>
            </div>
            {children}
        </>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Header;
