import React from 'react'
import { GameStatus } from '../../../../../../api/types'
import { useGameContext } from '../../../context/GameProvider'
import { LayoutFlex, LayoutHeader, HeaderButton, Timer } from './Header.styled'
import { IGameProps } from '../../../interfaces/GlobalInterface'

const Header = () => {
    const { playerState }: IGameProps = useGameContext()
    return (
        <LayoutHeader>
            <LayoutFlex>
                <HeaderButton>i</HeaderButton>
                {playerState.gameStatus === GameStatus.GUESSING && (
                    <Timer>{playerState.roundInfo?.timeLeft}</Timer>
                )}
                <HeaderButton>M</HeaderButton>
            </LayoutFlex>
        </LayoutHeader>
    )
}

export default Header
