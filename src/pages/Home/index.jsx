
import homeImage from '$/assets/chat-app-example-image.png';
import { FaVideo } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { RiChatPrivateLine } from "react-icons/ri";
import styles from './Home.module.scss';


const Home = () => {
    return (
        <div className={styles.home} id='home'>
            <div className={styles.home_container}>
                <div className={styles.home_container_leftside}>
                    <h1>Let's Create Your Society Right Now!</h1>
                    <p>Greate software that allows you to chat from any place at any time without any interuption</p>
                    <button>Start chating Now <i></i></button>
                </div>
                <div className={styles.home_container_rightside}>
                    <img src={homeImage} />
                </div>
            </div>
            <div className={styles.home_footer}>
                <h1>Features For a Better Experience</h1>
                <div className={styles.home_footer_content}>
                    <div className={styles.home_footer_content_card}>
                        <FaVideo />
                        <div className={styles.home_footer_content_card_text}>
                            <h3>Video Messaging</h3>
                            <p>This software is very easy for you to manage. You can use it as you wish.</p>
                        </div>
                    </div>
                    <div className={styles.home_footer_content_card}>
                        <MdAccessTime />
                        <div className={styles.home_footer_content_card_text}>
                            <h3>Save Your Time</h3>
                            <p>This software is very easy for you to manage. You can use it as you wish.</p>
                        </div>
                    </div>
                    <div className={styles.home_footer_content_card}>
                        <RiChatPrivateLine />
                        <div className={styles.home_footer_content_card_text}>
                            <h3>Keep Save & Private</h3>
                            <p>This software is very easy for you to manage. You can use it as you wish.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
