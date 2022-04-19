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
import Loading from '../../components/Loading/Loading'
import Board from '../../components/Board/Board'
import { setLoading } from '../../store/reducers/loadingSlice'

const Game = ({ userData, playerState, client }: IGameProps) => {
    const dispatch = useAppDispatch()
    const { nickname, visibleTeam } = useAppSelector((state) => state.player)
    const { loading } = useAppSelector((state) => state.loading)
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
        dispatch(setLoading(true))
        await client?.joinGame({
            name: n,
        })
        dispatch(setLoading(false))
    }

    return (
        <GameProvider gameProps={{ userData, playerState, client }}>
            <GameLayout>
                {isJoined ? (
                    <GridLayout>
                        <Team
                            name="Blue team"
                            backgroundColor={theme.colors.blueTeam}
                            teamColor={Color.BLUE}
                            showTeam={visibleTeam === 'left'}
                        />
                        <Team
                            name="Red team"
                            backgroundColor={theme.colors.redTeam}
                            teamColor={Color.RED}
                            showTeam={visibleTeam === 'right'}
                        />
                        <GridUnit>
                            {playerState.gameStatus ===
                                GameStatus.NOT_STARTED ||
                            playerState.gameStatus ===
                                GameStatus.ROUND_ENDED ? (
                                <>
                                    <Lobby />
                                    {loading && <Loading />}
                                </>
                            ) : null}
                            {playerState.gameStatus === GameStatus.AUCTION ||
                            playerState.gameStatus === GameStatus.GUESSING ? (
                                <Board />
                            ) : null}
                        </GridUnit>
                    </GridLayout>
                ) : loading ? (
                    <Loading />
                ) : (
                    <>
                        <JoinGame
                            handleJoin={newPlayer}
                            buttonName="Join game"
                        />
                    </>
                )}
            </GameLayout>
        </GameProvider>
    )
}

export default Game
