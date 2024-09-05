import homeImage from '$/assets/chat-app-example-image.png';
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
                    <h1>Cùng Xây Dựng Cộng Đồng Của Bạn Ngay Hôm Nay!</h1>
                    <p>Phần mềm tuyệt vời giúp bạn trò chuyện mọi lúc, mọi nơi mà không lo bị gián đoạn.</p>
                    <div className={styles.home_start_button}>
                        <RouterLinks to='/user/login'>Bắt Đầu Trò Chuyện Ngay</RouterLinks>
                        <FaArrowRight />
                    </div>
                </div>
                <div className={styles.home_container_rightside}>
                    <img src={homeImage} alt="Ứng dụng trò chuyện" />
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
