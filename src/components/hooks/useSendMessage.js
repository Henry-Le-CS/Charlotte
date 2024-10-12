import { useState } from "react"
import { toast } from "react-toastify"
import { setMessages } from "../../features/friends.slice"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { sendMessages } from "../../services/message"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, selectedFriend } = useAppSelector(state => state.friend)
    const disPatch = useAppDispatch()
    const send = async (message) => {
        setLoading(true)
        const receiverId = selectedFriend._id
        try {
            const results = await sendMessages(receiverId, message)
            disPatch(setMessages([...messages, results.metadata]))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { send, loading };
}

export default useSendMessage