import React, { useEffect } from 'react'
import { Color, PlayerInfo } from '../../../../../api/types'
import { ITeam } from '../../interfaces/TeamInterface'
import { Container, Teams, Center } from './Lobby.styled'
import theme from '../../theme'
import Team from '../Team/Team'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setNickname } from '../../store/reducers/playerSlice'
import JoinGame from '../JoinGame/JoinGame'

const Lobby = () => {
    const { client, playerState, userData }: IGameProps = useGameContext()
    const dispatch = useAppDispatch()
    const { nickname, isCreator } = useAppSelector((state) => state.player)

    const isJoined = playerState.players.find(
        (player) => player.id === userData.id
    )

    useEffect(() => {
        if (playerState.players.length === 0 && nickname) joinGame(nickname)
    }, [])

    const sortTeam = (players: Array<PlayerInfo>) => {
        const indexOfLeader: number = players.findIndex(
            (object: PlayerInfo) => object.isGivingClues === true
        )

        const leader = players[indexOfLeader]
        if (leader) {
            players.splice(indexOfLeader, 1)
            players.unshift(leader)
        }

        return players
    }

    const redTeam = sortTeam(
        playerState.players.filter((player) => player.team === Color.RED)
    )

    const blueTeam = sortTeam(
        playerState.players.filter((player) => player.team === Color.BLUE)
    )

    const teams: Array<ITeam> = [
        {
            name: 'Red Team',
            backgroundColor: theme.colors.redTeam,
            players: redTeam,
            teamColor: Color.RED,
        },
        {
            name: 'Spectators',
            backgroundColor: theme.colors.grayTeam,
            players: playerState.players.filter(
                (player) => player.team === Color.GRAY
            ),
            teamColor: Color.GRAY,
        },
        {
            name: 'Blue Team',
            backgroundColor: theme.colors.blueTeam,
            players: blueTeam,
            teamColor: Color.BLUE,
        },
    ]

    const changeNickname = async () => {
        client?.changeName({
            name: nickname,
        })
    }

    const joinGame = async (n: string) => {
        await client?.joinGame({
            name: n,
        })
    }

    const setNewNickname = (n: string) => dispatch(setNickname(n))

    const newPlayer = async (n: string) => {
        dispatch(setNickname(n))
        await joinGame(n)
    }

    return (
        <>
            {nickname && isJoined ? (
                <>
                    <Center>
                        <Container>
                            <div>
                                <input
                                    type="text"
                                    placeholder="New nickname"
                                    maxLength={10}
                                    onChange={(e) =>
                                        setNewNickname(e.target.value)
                                    }
                                />
                                <button
                                    disabled={
                                        nickname.length === 0 ||
                                        nickname.length < 3
                                    }
                                    onClick={changeNickname}
                                >
                                    Change
                                </button>
                            </div>

                            <Teams>
                                {teams.map((team, i) => (
                                    <Team key={i} team={team}></Team>
                                ))}
                            </Teams>
                            <button>Start Game</button>
                        </Container>
                    </Center>
                </>
            ) : (
                <>{!isCreator && <JoinGame handleJoin={newPlayer} />}</>
            )}
        </>
    )
}

export default Lobby
