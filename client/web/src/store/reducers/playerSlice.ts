import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
    nickname: string
    isCreator: boolean
    selectedWord: number
}

const initialState: PlayerState = {
    nickname: '',
    isCreator: false,
    selectedWord: -1
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
        },

        setSelectedWord(state, action: PayloadAction<number>) {
            state.selectedWord = action.payload
        }
    }
});


export const {
    setNickname,
    setIsCreator,
    setSelectedWord
} = playerSlice.actions;

export default playerSlice.reducer;
