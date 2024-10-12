
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    onlineUsers: [],
    isConnected: false,
    rooms: []
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        },
        connectionEstablished(state) {
            state.isConnected = true;
        },
        connectionLost(state) {
            state.isConnected = false;
        },
        joinRoom(state, action) {
            let rooms = action.payload.rooms
            state.rooms = state.rooms.concat(rooms)
            return
        }
    }
})

export const { setOnlineUsers, initSocket, connectionEstablished, connectionLost, joinRoom } = socketSlice.actions;
export default socketSlice.reducer;