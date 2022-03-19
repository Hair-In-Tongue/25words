import React, { createContext, useContext } from 'react'
import { IGameProps } from '../interfaces/GlobalInterface'

const GameContext = createContext<IGameProps | null>(null)

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
