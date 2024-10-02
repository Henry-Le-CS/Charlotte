
import { searchUser } from "$/services/user";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../../features/notifications.slice";
import styles from './index.module.scss';

const Search = ({ location, data, status }) => {
    const [metadata, setMetadata] = useState([])
    const [sidebarStatus, setSidebarStatus] = useState(true)
    const disPatch = useDispatch()
    const { handleSubmit, register } = useForm({
        defaultValues: {
          searchValue: ''
        }
      });

    useEffect(() => {
        if (metadata.length > 0) {
          data(metadata)
          setSidebarStatus(true)
          disPatch(setLoading(false))
        } else {
          disPatch(setLoading(false))
          setSidebarStatus(false)
        }
    }, [metadata])
    useEffect(() => {
      if (typeof status === 'function') {
        status(sidebarStatus);
      }
    }, [sidebarStatus])
      const onSearch = async (data) => {
        const query = new URLSearchParams();
      
        if (data.searchValue.trim()) {
          query.append(location, data.searchValue.trim()); 
        }
      
        try {
          const results = await searchUser(`${query.toString()}`); 
          const usersFound = results.metadata
          setMetadata(usersFound)
          if (!results.metadata.length) {
            setMetadata([])
            disPatch(setLoading(false))
            toast.error('Không tìm thấy kết quả');
          } else {
            disPatch(setLoading(false))
            toast.success(results.message);
          }
        } catch (error) {
          toast.error('Lỗi tìm kiếm: ' + (error.response?.data?.message || error.message || error));
        }
      };
    return (
        <div>
            <form onSubmit={handleSubmit(onSearch)} className={styles.search}>
                <label htmlFor="searchValue"></label>
                <input
                    type="text"
                    placeholder=" "
                    {...register('searchValue')}
                    // ref={inputRef}
                    onFocus={() => setSidebarStatus(true)}
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
    )
}
Search.propTypes = {
    location: PropTypes.string.isRequired,
    status: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
};

export default Search