import logo from '$/assets/Logo.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import HeaderLinks from '../HeaderLinks';
import RouterLinks from '../RouterLinks';
import styles from './Header.module.scss';

const Header = ({ children }) => {
    const [background, setBackground] = useState('unset');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                setBackground('var(--primary-header-color)');
            } else {
                setBackground('unset');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={styles.header} style={{ background }}>
                <div className={styles.header_logo}>
                    <RouterLinks id='logo' to='/'>
                        <img className={styles.header_img} src={logo} alt="Logo" />
                    </RouterLinks>
                </div>
                <HeaderLinks />
                <div className={styles.header_registration}>
                    <RouterLinks to='/user/login'>ĐĂNG NHẬP</RouterLinks>
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
