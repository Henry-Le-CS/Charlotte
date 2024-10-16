import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    friends: null,
    selectedFriend: null,
    messages: []
}

const friendsSlice = createSlice({
    name: 'friends',
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

export const { setFriends, setSelectedFriend, setMessages } = friendsSlice.actions
export default friendsSlice.reducer