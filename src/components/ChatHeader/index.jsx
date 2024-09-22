import { search } from "$/services/user";
import { useForm } from "react-hook-form";
import { AiOutlinePhone, AiOutlineStar, AiOutlineVideoCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import styles from './index.module.scss';
const ChatHeader = ( ) => {
    const { handleSubmit, register, setValue } = useForm({
        defaultValues: {
          searchValue: ''
        }
      });
    
      const onSearch = async (data) => {
        const formData = new FormData();
    
        Object.keys(data).forEach((key) => {
          if (data[key] !== '') {
            setValue(key, data[key]);
            formData.append(key, data[key]);
          }
        });
    
        try {
          const results = await search(formData);
          if (!results.data.length) {
            toast.error('Không tìm thấy kết quả');
          } else {
            toast.success(results.message);
          }
        } catch (error) {
          toast.error('Lỗi tìm kiếm: ' + (error.response?.data?.message || error.message || error));
        }
      };
    return (
        <header className="bg-transparent bubble-shadow p-5 text-gray-700 min-h-[60px] flex">
                {/* Left Side Chat Header */}
              <div className="flex items-center justify-start min-w-[50%] pl-10">
                <img src="https://wallpaperaccess.com/full/5665706.jpg" alt="" className="size-[40px] rounded-full object-cover" />
                <div className="flex flex-col items-center justify-start text-white">
                    <span className="text-4xl w-auto"><b>Thầy Lỏ</b></span>
                    <span className="pl-6 text-[var(--icon-color)]">Đang hoạt động</span>
                </div>
              </div>
              {/* Right Side Chat Header */}
              <div className={`${styles.right_side_chat} flex justify-end items-center min-w-[50%]`}>
                <div>
                    <form onSubmit={handleSubmit(onSearch)} className={styles.search}>
                        <input
                            type="text"
                            placeholder=" "
                            {...register('searchValue')}
                        />
                        <div>
                            <svg>
                            <use xlinkHref="#path" />
                            </svg>
                        </div>
                    </form>
                            
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 28" id="path">
                            <path d="M32.9418651,-20.6880772 C37.9418651,-20.6880772 40.9418651,-16.6880772 40.9418651,-12.6880772 C40.9418651,-8.68807717 37.9418651,-4.68807717 32.9418651,-4.68807717 C27.9418651,-4.68807717 24.9418651,-8.68807717 24.9418651,-12.6880772 C24.9418651,-16.6880772 27.9418651,-20.6880772 32.9418651,-20.6880772 L32.9418651,-29.870624 C32.9418651,-30.3676803 33.3448089,-30.770624 33.8418651,-30.770624 C34.08056,-30.770624 34.3094785,-30.6758029 34.4782612,-30.5070201 L141.371843,76.386562" transform="translate(83.156854, 22.171573) rotate(-225.000000) translate(-83.156854, -22.171573)"></path>
                        </symbol>
                    </svg>
                </div>
                <AiOutlineStar />
                <AiOutlineVideoCamera />
                <AiOutlinePhone />
              </div>
        </header>
    )
}

export default ChatHeader