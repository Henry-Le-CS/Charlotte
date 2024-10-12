import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    friends: null,
    selectedFriend: null,
    messages: []
}

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriends(state, action) {
            state.friends = action.payload
        },
        setSelectedFriend(state, action) {
            state.selectedFriend = action.payload
        },
        setMessages(state, action) {
            state.messages = action.payload
        }
    }
})

export const { setFriends, setSelectedFriend, setMessages } = friendSlice.actions
export default friendSlice.reducer