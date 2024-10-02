'use client'

import { useFetchNotificationsQuery } from '$/features/notifications.slice';
import { HiOutlineBell } from 'react-icons/hi2';
import { saveNotis, setLoading } from '../../features/notifications.slice';
import { useAppDispatch } from '../../redux/hooks';
export default function Notification() {
    // const [notis, setNotis] = useState([]);
    const { data = []} = useFetchNotificationsQuery()
    const disPatch = useAppDispatch()
    const handleNotis = () => {
        disPatch(setLoading(true))
        disPatch(saveNotis(data))
    }
    return (
        <>
            <HiOutlineBell onClick={handleNotis}/>
        </>
    );
}
