import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlayerState {
    nickname: string
    isCreator: boolean
    selectedWord: number
    visibleTeam: string
}

const initialState: PlayerState = {
    nickname: '',
    isCreator: false,
    selectedWord: -1,
    visibleTeam: 'none',
}

export const playerSlice = createSlice({
    name: 'player',
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
        },
        setVisibleTeam(state, action: PayloadAction<string>) {
            state.visibleTeam = action.payload
        },
    },
})

export const { setNickname, setIsCreator, setSelectedWord, setVisibleTeam } =
    playerSlice.actions

export default playerSlice.reducer
