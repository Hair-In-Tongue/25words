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
import { useTranslation } from 'react-i18next'

const Game = ({ userData, playerState, client }: IGameProps) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
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
            password: '',
        })
        dispatch(setLoading(false))
    }

    return (
        <GameProvider gameProps={{ userData, playerState, client }}>
            <GameLayout>
                {isJoined ? (
                    <GridLayout>
                        <Team
                            name={t('team.blueTeam')}
                            backgroundColor={theme.colors.blueTeam}
                            teamColor={Color.BLUE}
                            showTeam={visibleTeam === 'left'}
                        />
                        <Team
                            name={t('team.redTeam')}
                            backgroundColor={theme.colors.redTeam}
                            teamColor={Color.RED}
                            showTeam={visibleTeam === 'right'}
                        />
                        <GridUnit>
                            {playerState.gameStatus ===
                            GameStatus.NOT_STARTED ? (
                                <>
                                    <Lobby />
                                    {loading && <Loading />}
                                </>
                            ) : null}
                            {playerState.gameStatus !==
                            GameStatus.NOT_STARTED ? (
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
                            buttonName={t('buttons.joinGame')}
                        />
                    </>
                )}
            </GameLayout>
        </GameProvider>
    )
}

export default Game
