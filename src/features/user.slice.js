import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: null,
    isMobile: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.data = action.payload
        },
        setIsMobile(state, action) {
            state.isMobile = action.payload
        }
    }
})

export const { setUser, setIsMobile } = userSlice.actions
export default userSlice.reducer