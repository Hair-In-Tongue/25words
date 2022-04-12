import React from 'react'
import { Color, GameStatus } from '../../../../../api/types'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { Container, Team, Header, Number } from './InfoBoard.styled'

const InfoBoard = () => {
    const { playerState }: IGameProps = useGameContext()
    const findTeam = (teamColor: Color) => {
        return playerState?.teams?.find((team) => {
            if (team.color === teamColor) return team
        })
    }

    const currentTurn = findTeam(
        playerState?.roundInfo?.currentTurn || Color.RED
    )

    const guessedCards =
        playerState?.roundInfo?.board?.filter((card) => card.guessed).length ||
        0

    const redTeam = findTeam(Color.RED)
    const blueTeam = findTeam(Color.BLUE)

    const leftColor =
        playerState.gameStatus === GameStatus.AUCTION
            ? 'blueTeam'
            : playerState?.roundInfo?.currentTurn === Color.BLUE
            ? 'blueTeam'
            : 'redTeam'
    const rightColor =
        playerState.gameStatus === GameStatus.AUCTION
            ? 'redTeam'
            : playerState?.roundInfo?.currentTurn === Color.BLUE
            ? 'blueTeam'
            : 'redTeam'

    return (
        <Container>
            <Team left={true} color={leftColor}>
                {playerState?.gameStatus === GameStatus.AUCTION ? (
                    <>
                        <Header>HINTS</Header>
                        <Number>{blueTeam?.bid}</Number>
                    </>
                ) : (
                    <>
                        <Header>CARDS</Header>
                        <Number>{5 - guessedCards}</Number>
                    </>
                )}
            </Team>
            <Team left={false} color={rightColor}>
                <Header>HINTS</Header>
                <Number>
                    {playerState?.gameStatus === GameStatus.AUCTION
                        ? redTeam?.bid
                        : currentTurn?.bid}
                </Number>
            </Team>
        </Container>
    )
}

export default InfoBoard
