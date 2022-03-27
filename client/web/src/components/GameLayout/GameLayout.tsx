import React from 'react'
import Header from './Header/Header'
import { LayoutBody, LayoutContainer } from './GameLayout.styled'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'

const GameLayout = ({ children }: { children: React.ReactNode }) => {
    const { playerState }: IGameProps = useGameContext()
    return (
        <LayoutContainer currentTurn={playerState.roundInfo?.currentTurn}>
            <Header />
            <LayoutBody>{children}</LayoutBody>
        </LayoutContainer>
    )
}

export default GameLayout
