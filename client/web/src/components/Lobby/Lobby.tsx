import React from 'react'
import { Color } from '../../../../../api/types'
import { ILobbyProps } from '../../interfaces/Interface'
import {
    TeamCard,
    Container,
    PlayersList,
    JoinTeamBtn,
    Score,
    PlayerItem,
} from './Lobby.styled'

const Lobby = (props: ILobbyProps) => {
    const players = props.playerState.players
    const noTeam = players.filter((player) => player.team === Color.GRAY)
    const redTeam = players.filter((player) => player.team === Color.RED)
    const blueTeam = players.filter((player) => player.team === Color.BLUE)
    const redScore = props.playerState.teams[0].points
    const blueScore = props.playerState.teams[1].points

    return (
        <>
            {props.playerState.players.find(
                (player) => player.id === props.userData.id
            ) ? (
                <>
                    <Container>
                        <TeamCard color="#FFAEC9">
                            <Score>{redScore}</Score>
                            <PlayersList>
                                {redTeam.map((player) => (
                                    <PlayerItem key={player.id}>
                                        {player.id}
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

                        <TeamCard color="#99D9EA">
                            <Score>{blueScore}</Score>
                            <PlayersList>
                                {blueTeam.map((player) => (
                                    <PlayerItem key={player.id}>
                                        {player.id}
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
                    </Container>

                    <button
                        onClick={async () =>
                            await props.client.joinTeam({ team: Color.BLUE })
                        }
                    >
                        JOIN BLUE TEAM
                    </button>
                    <button
                        onClick={async () =>
                            await props.client.joinTeam({ team: Color.GRAY })
                        }
                    >
                        JOIN GRAY TEAM
                    </button>

                    <div>
                        <h1>BLUE TEAM</h1>
                        {blueTeam.map((player) => (
                            <div key={player.id}>{player.id}</div>
                        ))}
                    </div>
                    <div>
                        <h1>NO TEAM</h1>
                        {noTeam.map((player) => (
                            <div key={player.id}>{player.id}</div>
                        ))}
                    </div>
                </>
            ) : (
                <button onClick={async () => await props.client.joinGame({})}>
                    JOIN GAME
                </button>
            )}
        </>
    )
}

export default Lobby
