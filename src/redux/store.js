import { configureStore } from "@reduxjs/toolkit";
import friendReducer from '../features/friends.slice';
import notisReducer, { notiApiSlice } from '../features/notifications.slice';
import requestedUserReducer from "../features/requested.user";
import userReducer from '../features/user.slice';
export const store = configureStore({
    reducer: { 
        notis: notisReducer,
        [notiApiSlice.reducerPath]: notiApiSlice.reducer,
        requestedUser: requestedUserReducer,
        user: userReducer,
        friend: friendReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(notiApiSlice.middleware)
    }
})