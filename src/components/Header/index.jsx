import logo from '$/assets/Logo.png';
import { useState } from 'react';
import RouterLinks from '../RouterLinks';
import styles from './Header.module.scss';
const Header = ({ children }) => {
    const [background, setBackground ] = useState('unset')
    const [lineLeft, setLineLeft] = useState('none')
    const [lineWidth, setLineWidth] = useState('none')
    
    const headerBackgroundChanges = () => {
        const header = document.querySelector(`.${styles.header}`)
        if (header !== null ) {
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
    const lineActive = () => {
        const linkActive = document.querySelector('.active')
        const aElements = document.getElementsByTagName('a')
        const line = document.querySelector(`.${styles.header_line}`)
        for (const element of aElements) {
            console.log(element.outerText === linkActive.outerText)
            if (element.outerText === linkActive.outerText) {
                setLineLeft(linkActive.offsetLeft + 'px')
                setLineWidth(linkActive.offsetWidth + 'px')
            }
        }
        if (line != null) {
            line.style.width = lineWidth
            line.style.left = lineLeft
        }
    }
    return (
        <>
            <div className={styles.header}>
                <div className={styles.header_logo}>
                    <RouterLinks to='/'>
                        <img className={styles.header_img} src={logo} alt="" />
                    </RouterLinks>
                </div>
                <div className={styles.header_links}>
                    <RouterLinks to='/'>Home</RouterLinks>
                    <RouterLinks to='/about'>About</RouterLinks>
                    <RouterLinks to='/blog'>Blog</RouterLinks>
                    <RouterLinks to='/pages'>Pages</RouterLinks>
                    <RouterLinks to='/contact'>Contact</RouterLinks>
                    <div className={styles.header_line}></div>
                    {lineActive()}
                </div>
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