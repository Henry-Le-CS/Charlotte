import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null
}

const requestedUserSlice = createSlice({
    name: "requestedUser",
    initialState,
    reducers: {
        setRequestedUser(state, action) {
            state.user = action.payload
        }
    }
})

export const { setRequestedUser } = requestedUserSlice.actions
export default requestedUserSlice.reducer