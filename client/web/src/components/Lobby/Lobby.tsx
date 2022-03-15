import React, { useState } from 'react'
import { Color } from '../../../../../api/types'
import { ILobbyProps } from '../../interfaces/Interface'
import {
    TeamCard,
    Container,
    PlayersList,
    JoinTeamBtn,
    Score,
    PlayerItem,
    Teams,
} from './Lobby.styled'

const Lobby = (props: ILobbyProps) => {
    const players = props.playerState.players
    const noTeam = players.filter((player) => player.team === Color.GRAY)
    const redTeam = players.filter((player) => player.team === Color.RED)
    const blueTeam = players.filter((player) => player.team === Color.BLUE)
    const [newNickname, setNewNickname] = useState<string>('')
    const nickname = localStorage.getItem('nickname')

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
                                onClick={() => {
                                    props.client.changeName({
                                        name: newNickname,
                                    })
                                }}
                            >
                                Change
                            </button>
                        </div>

                        <Teams>
                            <TeamCard color="#FFAEC9">
                                <Score>Red Team</Score>
                                <PlayersList>
                                    {redTeam.map((player) => (
                                        <PlayerItem key={player.id}>
                                            {player.name}
                                        </PlayerItem>
                                    ))}
                                </PlayersList>

                                <JoinTeamBtn
                                    color="pink"
                                    onClick={async () =>
                                        await props.client.joinTeam({
                                            team: Color.RED,
                                        })
                                    }
                                >
                                    JOIN RED TEAM
                                </JoinTeamBtn>
                            </TeamCard>

                            <TeamCard color="lightgray">
                                <Score>Spectators</Score>
                                <PlayersList>
                                    {noTeam.map((player) => (
                                        <PlayerItem key={player.id}>
                                            {player.name}
                                        </PlayerItem>
                                    ))}
                                </PlayersList>

                                <JoinTeamBtn
                                    color="#e3e3e3"
                                    onClick={async () =>
                                        await props.client.joinTeam({
                                            team: Color.GRAY,
                                        })
                                    }
                                >
                                    JOIN RED TEAM
                                </JoinTeamBtn>
                            </TeamCard>

                            <TeamCard color="#99D9EA">
                                <Score>Blue Team</Score>
                                <PlayersList>
                                    {blueTeam.map((player) => (
                                        <PlayerItem key={player.id}>
                                            {player.name}
                                        </PlayerItem>
                                    ))}
                                </PlayersList>

                                <JoinTeamBtn
                                    color="lightblue"
                                    onClick={async () =>
                                        await props.client.joinTeam({
                                            team: Color.BLUE,
                                        })
                                    }
                                >
                                    JOIN BLUE TEAM
                                </JoinTeamBtn>
                            </TeamCard>
                        </Teams>
                    </Container>
                </>
            ) : (
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Your nickname"
                            maxLength={10}
                            onChange={(e) => setNewNickname(e.target.value)}
                        />
                        <button
                            disabled={
                                newNickname.length === 0 ||
                                newNickname.length < 3
                            }
                            onClick={async () =>
                                await props.client.joinGame({
                                    name: newNickname,
                                })
                            }
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
