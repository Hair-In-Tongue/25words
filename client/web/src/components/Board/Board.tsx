import React from 'react'
import { Container, FirstRow, Button } from './Board.styled'
import Cards from '../Cards/Cards'
import { GameStatus } from '../../../../../api/types'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import WordInput from '../WordInput/WordInput'
import RoundInfo from '../RoundInfo/RoundInfo'
import Bid from '../Bid/Bid'

const Board = () => {
    const { client, playerState, userData }: IGameProps = useGameContext()
    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const startRound = async () => {
        await client?.startGame({})
    }

    return (
        <Container>
            {playerState.gameStatus === GameStatus.AUCTION ? (
                <FirstRow>
                    <RoundInfo />
                    {playerDetails?.isGivingClues && <Bid />}
                    <Cards />
                </FirstRow>
            ) : playerState.gameStatus === GameStatus.GUESSING ? (
                <FirstRow>
                    <RoundInfo />
                    <Cards />
                    <WordInput />
                </FirstRow>
            ) : (
                <FirstRow>
                    <Cards />
                    {playerDetails?.isAdmin && (
                        <Button onClick={startRound}>Next round</Button>
                    )}
                </FirstRow>
            )}
        </Container>
    )
}

export default Board
