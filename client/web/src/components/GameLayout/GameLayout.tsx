import React from 'react'
import Header from './Header/Header'
import {
    Gradient,
    BackgroundImage,
    LayoutBody,
    LayoutContainer,
} from './GameLayout.styled'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'

const GameLayout = ({ children }: { children: React.ReactNode }) => {
    const { playerState }: IGameProps = useGameContext()
    return (
        <LayoutContainer>
            <Header />
            <Gradient currentTurn={playerState.roundInfo?.currentTurn} />
            <BackgroundImage />
            <LayoutBody>{children}</LayoutBody>
        </LayoutContainer>
    )
}

export default GameLayout
