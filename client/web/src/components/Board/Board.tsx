import React from 'react'
import { Container, FirstRow } from './Board.styled'
import Cards from '../Cards/Cards'
import { GameStatus } from '../../../../../api/types'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import WordInput from '../WordInput/WordInput'
import InfoBoard from '../RoundInfo/InfoBoard'
import Bid from '../Bid/Bid'

const Board = () => {
    const { playerState, userData }: IGameProps = useGameContext()
    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    return (
        <Container>
            {playerState.gameStatus === GameStatus.AUCTION && (
                <FirstRow>
                    <InfoBoard />
                    {playerDetails?.isGivingClues && <Bid />}
                    <Cards />
                </FirstRow>
            )}
            {playerState.gameStatus === GameStatus.GUESSING && (
                <FirstRow>
                    <InfoBoard />
                    <Cards />
                    <WordInput />
                </FirstRow>
            )}
        </Container>
    )
}

export default Board
