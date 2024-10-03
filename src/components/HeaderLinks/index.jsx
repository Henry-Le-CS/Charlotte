import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RouterLinks from '../RouterLinks';
import styles from './HeaderLinks.module.scss';

export default function HeaderLinks() {
    const [lineLeft, setLineLeft] = useState('0');
    const [lineWidth, setLineWidth] = useState('0');
    const location = useLocation();

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
    return (
        <>
            <div className={styles.header_links}>
                <RouterLinks to='/'>Trang Chủ</RouterLinks>
                <RouterLinks to='/about'>Giới Thiệu</RouterLinks>
                <RouterLinks to='/blog'>Blog</RouterLinks>
                <RouterLinks to='/features'>Features</RouterLinks>
                <RouterLinks to='/contact'>Liên Hệ</RouterLinks>
                <div className={styles.header_links_line} style={{ left: lineLeft, width: lineWidth }}></div>
            </div>
        </>
    );
}
