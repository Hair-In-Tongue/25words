import React from 'react'
import { Color, PlayerInfo } from '../../../../../api/types'
import {
    TeamCard,
    Details,
    Players,
    Leader,
    PlayersList,
    JoinTeamBtn,
    Score,
    Circle,
} from './Team.styled'
import { useGameContext } from '../../context/GameProvider'
import { ITeamProps } from '../../interfaces/TeamInterface'
import { IGameProps } from '../../interfaces/GlobalInterface'

const Team = ({ backgroundColor, teamColor }: ITeamProps) => {
    const { client, playerState, userData }: IGameProps = useGameContext()

    const team = playerState.teams?.find((t) => t.color === teamColor)
    const teamPlayers = playerState.players.filter((p) => p.team === teamColor)
    const left = teamColor === Color.BLUE

    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const joinTeam = async () => {
        await client?.joinTeam({
            team: teamColor,
        })
    }

    const joinAsLeader = async () => {
        await client?.joinAsLeader({ team: teamColor })
    }

    const findLeader = (players: Array<PlayerInfo>) => {
        const indexOfLeader: number = players.findIndex(
            (object: PlayerInfo) => object.isGivingClues === true
        )
        return indexOfLeader < 0 ? '' : players[indexOfLeader]
    }

    const teamLeader = findLeader(teamPlayers)

    return (
        <TeamCard left={left}>
            <Details color={backgroundColor}>
                <Players>
                    <Leader>
                        {teamLeader ? teamLeader.name : 'Leader Name'}
                    </Leader>
                    <PlayersList>
                        {teamPlayers.map(
                            (player: PlayerInfo) =>
                                !player.isGivingClues &&
                                player.team !== Color.GRAY && (
                                    <li key={player.id}>{player.name}</li>
                                )
                        )}
                    </PlayersList>
                </Players>

                {playerDetails?.team !== team?.color ||
                playerDetails?.team === Color.GRAY ||
                playerDetails?.isGivingClues ? (
                    <JoinTeamBtn color={backgroundColor} onClick={joinTeam}>
                        JOIN
                    </JoinTeamBtn>
                ) : (
                    <JoinTeamBtn onClick={joinAsLeader}>LEAD</JoinTeamBtn>
                )}
            </Details>
            <Score color={backgroundColor}>
                <Circle>{team?.points}</Circle>
            </Score>
        </TeamCard>
    )
}

export default Team
