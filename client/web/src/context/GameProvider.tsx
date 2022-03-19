import React, { createContext, useContext } from 'react'
import { IGameProps } from '../interfaces/GlobalInterface'
import { GameStatus } from '../../../../api/types'

const GameContext = createContext<IGameProps>({
    userData: {
        token: '',
        id: '',
        name: '',
    },
    playerState: {
        players: [],
        gameStatus: GameStatus.NOT_STARTED,
        roundInfo: undefined,
        teams: undefined,
    },
    client: undefined,
})

interface IGameProvider {
    children: React.ReactNode
    gameProps: IGameProps
}

export const GameProvider = ({ children, gameProps }: IGameProvider) => {
    return (
        <GameContext.Provider value={gameProps}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => useContext(GameContext)
