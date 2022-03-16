import React from 'react'
import { ITeamProps } from '../../interfaces/Interface'
import { PlayerInfo } from '../../../../../api/types'
import {
    TeamCard,
    PlayersList,
    JoinTeamBtn,
    Score,
    PlayerItem,
} from './Lobby.styled'

const Team = (props: ITeamProps) => {
    const joinTeam = async () => {
        await props.client.joinTeam({
            team: props.team.teamColor,
        })
    }

    return (
        <TeamCard color={props.team.backgroundColor}>
            <Score>{props.team.name}</Score>
            <PlayersList>
                {props.team.players.map((player: PlayerInfo) => (
                    <PlayerItem key={player.id}>{player.name}</PlayerItem>
                ))}
            </PlayersList>

            <JoinTeamBtn onClick={joinTeam}>
                JOIN {props.team.name.toUpperCase()}
            </JoinTeamBtn>
        </TeamCard>
    )
}

export default Team
