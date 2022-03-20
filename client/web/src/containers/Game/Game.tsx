import React, { useEffect } from 'react'
import GameLayout from '../../components/GameLayout/GameLayout'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { GameProvider } from '../../context/GameProvider'
import { Color, GameStatus } from '../../../../../api/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { GridLayout, GridUnit } from './Game.styled'
import Team from '../../components/Team/Team'
import JoinGame from '../../components/JoinGame/JoinGame'
import theme from '../../theme'
import { setNickname } from '../../store/reducers/playerSlice'
import Lobby from '../../components/Lobby/Lobby'

const Game = ({ userData, playerState, client }: IGameProps) => {
    const dispatch = useAppDispatch()
    const { nickname, isCreator } = useAppSelector((state) => state.player)
    const isJoined = playerState.players.find(
        (player) => player.id === userData.id
    )

    useEffect(() => {
        if (playerState.players.length === 0 && nickname) joinGame(nickname)
    }, [])

    const newPlayer = async (n: string) => {
        dispatch(setNickname(n))
        await joinGame(n)
    }

    const joinGame = async (n: string) => {
        await client?.joinGame({
            name: n,
        })
    }

    return (
        <GameProvider gameProps={{ userData, playerState, client }}>
            <GameLayout>
                {isJoined ? (
                    <GridLayout>
                        <GridUnit>
                            <Team
                                name="Red team"
                                backgroundColor={theme.colors.redTeam}
                                teamColor={Color.RED}
                            />
                        </GridUnit>
                        <GridUnit>
                            {playerState.gameStatus ===
                                GameStatus.NOT_STARTED && <Lobby />}
                            {playerState.gameStatus === GameStatus.AUCTION && (
                                <div>Bidding</div>
                            )}
                        </GridUnit>
                        <GridUnit>
                            <Team
                                name="Blue team"
                                backgroundColor={theme.colors.blueTeam}
                                teamColor={Color.BLUE}
                            />
                        </GridUnit>
                    </GridLayout>
                ) : (
                    <>
                        {!isCreator && (
                            <JoinGame
                                handleJoin={newPlayer}
                                buttonName="Join game"
                            />
                        )}
                    </>
                )}
            </GameLayout>
        </GameProvider>
    )
}

export default Game
