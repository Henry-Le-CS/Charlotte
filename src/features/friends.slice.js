import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    friends: null,
    friendOnChat: null
}

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriend(state, action) {
            state.friends = action.payload
        },
        setFriendOnChat(state, action) {
            state.friendOnChat = action.payload
        }
    }
})

export const { setFriend, setFriendOnChat } = friendSlice.actions
export default friendSlice.reducer