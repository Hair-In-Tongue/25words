import React, { useState } from 'react'
import { Color, PlayerInfo } from '../../../../../api/types'
import { ILobbyProps, ITeam } from '../../interfaces/Interface'
import { Container, Teams, Center, ProgressBar } from './Lobby.styled'
import theme from '../../theme'
import Team from '../Team/Team'

const Lobby = (props: ILobbyProps) => {
    const players = props.playerState.players
    const [newNickname, setNewNickname] = useState<string>(
        localStorage.getItem('nickname') || ''
    )
    const isJoined = props.playerState.players.find(
        (player) => player.id === props.userData.id
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
        props.client.changeName({
            name: newNickname,
        })
    }

    const joinGame = async () => {
        await props.client.joinGame({
            name: newNickname,
        })
    }

    if (props.playerState.players.length === 0 && newNickname) joinGame()

    return (
        <>
            {newNickname && isJoined ? (
                <>
                    {console.log(props.userData)}
                    {console.log(props.playerState)}
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
                                    <Team
                                        key={i}
                                        team={team}
                                        playerState={props.playerState}
                                        userData={props.userData}
                                        client={props.client}
                                    ></Team>
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
