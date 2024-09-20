import { useEffect } from 'react';
import RouterLinks from '../RouterLinks';
import styles from './index.module.scss';

export default function MobileHeaderLogin() {
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
                <RouterLinks to='/user/register'>Đăng ký</RouterLinks>
                <RouterLinks to='/user/login'>Đăng nhập</RouterLinks>
            </div>
        </>
    );
}
