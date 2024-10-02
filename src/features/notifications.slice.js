import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notiApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API_ENDPOINT,
        credentials: 'include',
    }),
    endpoints(builder) {
        return {
            fetchNotifications: builder.query({
                query() {
                    return `/notifications`
                }
            })
        }
    }
})

const initialState = {
    data: null,
    isLoading: false
}
const notiSlice = createSlice({
    name: 'notis',
    initialState,
    reducers: {
        saveNotis(state, action) {
            state.data = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        }
    }
})

export const { useFetchNotificationsQuery } = notiApiSlice
export const { saveNotis, setLoading } = notiSlice.actions
export default notiSlice.reducer