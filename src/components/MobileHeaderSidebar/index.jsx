import { useEffect } from 'react';
import RouterLinks from '../RouterLinks';
import styles from './index.module.scss';

export default function MobileHeaderSidebar() {
    // const location = useLocation();

    useEffect(() => {

        // const updateLinePosition = (element) => {
        //     setLineLeft(element.offsetLeft + 'px');
        //     setLineWidth(element.offsetWidth + 'px');
        // };

        const setActiveLink = () => {
            // const currentPath = location.pathname;
        };

        setActiveLink();
    }, []);
    return (
        <>
            <div className={styles.mobile_header_links}>
                <RouterLinks to='/'>Trang Chủ</RouterLinks>
                <RouterLinks to='/about'>Giới Thiệu</RouterLinks>
                <RouterLinks to='/blog'>Blog</RouterLinks>
                <RouterLinks to='/pages'>Trang</RouterLinks>
                <RouterLinks to='/contact'>Liên Hệ</RouterLinks>
            </div>
        </>
    );
}
