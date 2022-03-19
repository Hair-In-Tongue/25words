import React, { useState } from 'react'
import { Color, PlayerInfo } from '../../../../../api/types'
import { ITeam } from '../../interfaces/TeamInterface'
import { Container, Teams, Center } from './Lobby.styled'
import theme from '../../theme'
import Team from '../Team/Team'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'

const Lobby = () => {
    const { client, playerState, userData }: IGameProps = useGameContext()

    const players = playerState.players
    const [newNickname, setNewNickname] = useState<string>(
        localStorage.getItem('nickname') || ''
    )
    const isJoined = playerState.players.find(
        (player) => player.id === userData.id
    )

    const sortTeam = (players: Array<PlayerInfo>) => {
        const indexOfLeader: number = players.findIndex(
            (object: PlayerInfo) => {
                return object.isGivingClues === true
            }
        )

        if (indexOfLeader >= 0) {
            for (let i = 0; i < indexOfLeader; i++) {
                players.push(players.shift())
            }
        }
        return players
    }

    const redTeam = sortTeam(
        players.filter((player) => player.team === Color.RED)
    )

    const blueTeam = sortTeam(
        players.filter((player) => player.team === Color.BLUE)
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
            players: players.filter((player) => player.team === Color.GRAY),
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
        client.changeName({
            name: newNickname,
        })
    }

    const joinGame = async () => {
        await client.joinGame({
            name: newNickname,
        })
    }

    if (playerState.players.length === 0 && newNickname) joinGame()

    return (
        <>
            {newNickname && isJoined ? (
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
                                        newNickname.length === 0 ||
                                        newNickname.length < 3
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
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Your nickname"
                            value={newNickname}
                            maxLength={10}
                            onChange={(e) => setNewNickname(e.target.value)}
                        />
                        <button
                            disabled={
                                newNickname.length === 0 ||
                                newNickname.length < 3
                            }
                            onClick={joinGame}
                        >
                            JOIN GAME
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default Lobby
