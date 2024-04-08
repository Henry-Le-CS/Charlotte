import logo from '$/assets/Logo.png';
import { useState } from 'react';
import HeaderLinks from '../HeaderLinks';
import RouterLinks from '../RouterLinks';
import styles from './Header.module.scss';
const Header = ({ children }) => {
    const [background, setBackground ] = useState('unset')
    
    const headerBackgroundChanges = () => {
        const header = document.querySelector(`.${styles.header}`)
        if (header) {
            header.style.background = background
        } 
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                setBackground('var(--primary-header-color)')
            } else {
                setBackground('unset')
            }
        })
    }
    
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_logo}>
                    <RouterLinks id='logo' to='/'>
                        <img className={styles.header_img} src={logo} alt="" />
                    </RouterLinks>
                </div>
                <HeaderLinks />
                <div className={styles.header_registration}>
                    <RouterLinks to='/user/login'>Login</RouterLinks>
                    <div className={styles.header_registration_button}>
                        <RouterLinks to='/user/register'>Get Started Free</RouterLinks>
                        <RouterLinks to='/user/register'>Get Started Free</RouterLinks>
                    </div>
                </div>
            </div>
            {headerBackgroundChanges()}
            {children}
        </>
    )
}
export default Header