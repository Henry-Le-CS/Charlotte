import { configureStore } from "@reduxjs/toolkit";
import friendReducer from '../features/friends.slice';
import notisReducer, { notiApiSlice } from '../features/notifications.slice';
import requestedUserReducer from "../features/requested.user";
import socketReducer from "../features/socket.slice";
import userReducer from '../features/user.slice';
export const store = configureStore({
    reducer: { 
        notis: notisReducer,
        [notiApiSlice.reducerPath]: notiApiSlice.reducer,
        requestedUser: requestedUserReducer,
        user: userReducer,
        friend: friendReducer,
        socket: socketReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(notiApiSlice.middleware)
    }
})