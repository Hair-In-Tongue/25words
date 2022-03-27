import React from 'react'
import { Container, FirstRow } from './Board.styled'
import Cards from '../Cards/Cards'
import Bid from '../Bid/Bid'
import { Color, GameStatus } from '../../../../../api/types'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import WordInput from '../WordInput/WordInput'

const Board = () => {
    const { playerState }: IGameProps = useGameContext()
    const currentTeam = playerState.teams?.find(
        (t) => t.color === playerState.roundInfo?.currentTurn
    )
    return (
        <Container>
            {playerState.gameStatus === GameStatus.AUCTION && (
                <FirstRow>
                    <Bid teamColor={Color.RED} />
                    <Bid teamColor={Color.BLUE} />
                </FirstRow>
            )}
            {playerState.gameStatus === GameStatus.GUESSING && (
                <>
                    <FirstRow>
                        <div>Timer: {playerState.roundInfo?.timeLeft}</div>
                        <div>Clues left: {currentTeam?.bid}</div>
                    </FirstRow>
                    <WordInput />
                </>
            )}

            <Cards />
        </Container>
    )
}

export default Board
