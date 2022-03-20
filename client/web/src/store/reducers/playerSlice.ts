import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
    nickname: string
    isCreator: boolean
}

const initialState: PlayerState = {
    nickname: '',
    isCreator: false,
};


export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setNickname(state, action: PayloadAction<string>) {
            state.nickname = action.payload
        },
        setIsCreator(state, action: PayloadAction<boolean>) {
            state.isCreator = action.payload
        }
    }
});


export const {
    setNickname,
    setIsCreator
} = playerSlice.actions;

export default playerSlice.reducer;
