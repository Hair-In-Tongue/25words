import React, { useState } from 'react'
import { Color } from '../../../../../api/types'
import { ILobbyProps, ITeam } from '../../interfaces/Interface'
import { Container, Teams } from './Lobby.styled'
import Team from './Team'

const Lobby = (props: ILobbyProps) => {
    const players = props.playerState.players
    const [newNickname, setNewNickname] = useState<string>(
        localStorage.getItem('nickname') || ''
    )
    const teams: Array<ITeam> = [
        {
            name: 'Red Team',
            backgroundColor: '#FFAEC9',
            players: players.filter((player) => player.team === Color.RED),
            teamColor: Color.RED,
        },
        {
            name: 'Spectators',
            backgroundColor: 'lightgray',
            players: players.filter((player) => player.team === Color.GRAY),
            teamColor: Color.GRAY,
        },
        {
            name: 'Blue Team',
            backgroundColor: '#99D9EA',
            players: players.filter((player) => player.team === Color.BLUE),
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

    return (
        <>
            {props.playerState.players.find(
                (player) => player.id === props.userData.id
            ) ? (
                <>
                    <Container>
                        <div>
                            <input
                                type="text"
                                placeholder="New nickname"
                                maxLength={10}
                                onChange={(e) => setNewNickname(e.target.value)}
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
                                    client={props.client}
                                ></Team>
                            ))}
                        </Teams>
                    </Container>
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
