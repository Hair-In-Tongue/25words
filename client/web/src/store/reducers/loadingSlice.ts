import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoaderState {
    loading: boolean
}

const initialState: LoaderState = {
    loading: false,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    },
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
