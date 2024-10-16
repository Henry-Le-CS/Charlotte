import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setMessages } from "../../features/friends.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getMessages } from "../../services/message";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, selectedFriend } = useAppSelector(state => state.friends);
    const disPatch = useAppDispatch();

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            try {
                const results = await getMessages(selectedFriend._id)
                toast.success(results.message)
                disPatch(setMessages(results.metadata))
            } catch (error) {
                toast.error(error.messages)
            } finally {
                setLoading(false)
            }
        }
        if (selectedFriend?._id) get()
    }, [selectedFriend?._id, setMessages])

    return { messages, loading}
}

export default useGetMessages;