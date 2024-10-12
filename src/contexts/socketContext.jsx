import { PropTypes } from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import { setOnlineUsers } from "../features/socket.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const userData = useAppSelector((state) => state.user.data)
    const disPatch = useAppDispatch()
    const [onlineUsers, setUsersOnline] = useState([]);
    const [socket, setSocket] = useState(null);
    // Initialize Socket.IO connection after successful status check
    useEffect(() => {
        if (userData) {
            const newSocket = io(import.meta.env.VITE_APP_WS_ENDPOINT, {
                query: { userId: userData?._id },
                withCredentials: true,
            });
            setSocket(newSocket);
            newSocket.on("getOnlineUsers", (users) => {
				setUsersOnline(users);
			});

            disPatch(setOnlineUsers(onlineUsers))

            return () => newSocket.disconnect();	
        } else {
            if (socket) {
				socket.close();
				setSocket(null);
			}
        }
    }, [userData])

    return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

SocketContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
