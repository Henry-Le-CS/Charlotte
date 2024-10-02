import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    friend: null
}

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriend(state, action) {
            state.friend = action.payload
        }
    }
})

export const { setFriend } = friendSlice.actions
export default friendSlice.reducer