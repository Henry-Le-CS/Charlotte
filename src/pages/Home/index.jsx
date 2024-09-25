import RouterLinks from '$/components/RouterLinks';
import { FaArrowRight, FaVideo } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { RiChatPrivateLine } from "react-icons/ri";
import styles from './Home.module.scss';

const Home = () => {
    return (
        <div className={styles.home} id='home'>
            <div className={styles.home_container}>
                <div className={styles.home_container_leftside}>
                    <h1 className='font-sans'>Chat Box Thế Hệ Mới, Giao Diện Mới, Cuộc Sống Mới</h1>
                    <p>Phần mềm tuyệt vời giúp bạn trò chuyện mọi lúc, mọi nơi mà không lo bị gián đoạn.</p>
                    <div className={styles.home_start_button}>
                        <RouterLinks to='/user/login'>Bắt Đầu Trò Chuyện Ngay</RouterLinks>
                        <FaArrowRight />
                    </div>
                </div>
                <div className={styles.home_container_rightside}>
                    <img src='https://cdn.dribbble.com/users/948834/screenshots/4257434/1.png?resize=768x576&vertical=center' alt="Ứng dụng trò chuyện" />
                </div>
            </div>
            <div className={styles.home_footer}>
                <h1>Các Tính Năng Giúp Trải Nghiệm Tốt Hơn</h1>
                <div className={styles.home_footer_content}>
                    <div className={styles.home_footer_content_card}>
                        <FaVideo />
                        <div className={styles.home_footer_content_card_text}>
                            <h3>Tin Nhắn Video</h3>
                            <p>Phần mềm rất dễ sử dụng, bạn hoàn toàn có thể tùy chỉnh theo nhu cầu của mình.</p>
                        </div>
                    </div>
                    <div className={styles.home_footer_content_card}>
                        <MdAccessTime />
                        <div className={styles.home_footer_content_card_text}>
                            <h3>Tiết Kiệm Thời Gian</h3>
                            <p>Phần mềm rất dễ sử dụng, bạn hoàn toàn có thể tùy chỉnh theo nhu cầu của mình.</p>
                        </div>
                    </div>
                    <div className={styles.home_footer_content_card}>
                        <RiChatPrivateLine />
                        <div className={styles.home_footer_content_card_text}>
                            <h3>An Toàn & Bảo Mật</h3>
                            <p>Phần mềm rất dễ sử dụng, bạn hoàn toàn có thể tùy chỉnh theo nhu cầu của mình.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
