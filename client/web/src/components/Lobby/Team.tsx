import React from 'react'
import { ITeamProps } from '../../interfaces/Interface'
import { Color, PlayerInfo } from '../../../../../api/types'
import {
    TeamCard,
    PlayersList,
    JoinTeamBtn,
    Score,
    CrownIcon,
} from './Lobby.styled'
import crownIcon from '/crown-icon.svg'

const Team = (props: ITeamProps) => {
    const playerDetails = props.playerState.players.find((p) => {
        if (p.id === props.userData.id) {
            return p
        }
    })

    const joinTeam = async () => {
        await props.client.joinTeam({
            team: props.team.teamColor,
        })
    }

    const joinAsLeader = async () => {
        await props.client.joinAsLeader({ team: props.team.teamColor })
    }

    return (
        <TeamCard color={props.team.backgroundColor}>
            <Score>{props.team.name}</Score>
            <PlayersList>
                {props.team.players.map((player: PlayerInfo) =>
                    player.isGivingClues && player.team !== Color.GRAY ? (
                        <li key={player.id}>
                            <CrownIcon src={crownIcon}></CrownIcon>
                            {player.name}
                            <CrownIcon src={crownIcon}></CrownIcon>
                        </li>
                    ) : (
                        <li key={player.id}>{player.name}</li>
                    )
                )}
            </PlayersList>
            {playerDetails?.team !== props.team.teamColor ||
            playerDetails?.team === Color.GRAY ||
            playerDetails?.isGivingClues ? (
                <JoinTeamBtn
                    color={props.team.backgroundColor}
                    onClick={joinTeam}
                >
                    JOIN {props.team.name.toUpperCase()}
                </JoinTeamBtn>
            ) : (
                <JoinTeamBtn onClick={joinAsLeader}>PLAY AS LEADER</JoinTeamBtn>
            )}
        </TeamCard>
    )
}

export default Team
