import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IBidValue {
    bidValue: number
}

const initialState: IBidValue = {
    bidValue: 25,
}

export const bidSlice = createSlice({
    name: 'playerBid',
    initialState,
    reducers: {
        setBidValue(state, action: PayloadAction<number>) {
            state.bidValue = action.payload
        },
    },
})

export const { setBidValue } = bidSlice.actions

export default bidSlice.reducer
