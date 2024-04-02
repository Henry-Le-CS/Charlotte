import logo from '$/assets/Logo.png';
import { useState } from 'react';
import { RouterLinks } from '../RouterLinks';
import styles from './Header.module.scss';
const Header = ({ children }) => {
    const [background, setBackground ] = useState('none')
    const headerBackgroundChanges = () => {
        const header = document.querySelector(`.${styles.header}`)
        if (header !== null ) {
            header.style.background = background
        } 
        
        window.addEventListener('scroll', () => {
            console.log(window.scrollY)
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
                    <RouterLinks to='/'>
                        <img className={styles.header_img} src={logo} alt="" />
                    </RouterLinks>
                </div>
                {/* Developing... */}
                <div className={styles.header_links}>
                    <RouterLinks to=''>App</RouterLinks>
                    <RouterLinks to=''>About</RouterLinks>
                    <RouterLinks to=''>Blog</RouterLinks>
                    <RouterLinks to=''>Pages</RouterLinks>
                    <RouterLinks to=''>Contact</RouterLinks>
                </div>
                <div className={styles.header_registration}>
                    <RouterLinks to='/user/login'>Login</RouterLinks>
                    <RouterLinks to='/user/register'>Get Started Free</RouterLinks>
                </div>
            </div>
            {headerBackgroundChanges()}
            {children}
        </>
    )
}
export default Header