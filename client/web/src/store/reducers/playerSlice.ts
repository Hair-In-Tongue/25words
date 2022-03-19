import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nickname: '',
    isCreator: false,
};


export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setNickname(state, action) {
            state.nickname = action.payload
        },
        setIsCreator(state, action) {
            state.isCreator = action.payload
        }
    }
});


export const {
    setNickname,
    setIsCreator
} = playerSlice.actions;

export default playerSlice.reducer;
