import React from 'react'
import { Color, PlayerInfo } from '../../../../../api/types'
import {
    TeamCard,
    PlayersList,
    JoinTeamBtn,
    Score,
    CrownIcon,
} from './Team.styled'
import { iconList } from '../../assets/index'
import { useGameContext } from '../../context/GameProvider'
import { ITeamProps } from '../../interfaces/TeamInterface'
import { IGameProps } from '../../interfaces/GlobalInterface'

const Team = ({ team }: ITeamProps) => {
    const { client, playerState, userData }: IGameProps = useGameContext()

    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const joinTeam = async () => {
        await client?.joinTeam({
            team: team.teamColor,
        })
    }

    const joinAsLeader = async () => {
        await client?.joinAsLeader({ team: team.teamColor })
    }

    return (
        <TeamCard color={team.backgroundColor}>
            <Score>{team.name}</Score>
            <PlayersList>
                {team.players.map((player: PlayerInfo) =>
                    player.isGivingClues && player.team !== Color.GRAY ? (
                        <li key={player.id}>
                            <CrownIcon src={iconList.crownIcon}></CrownIcon>
                            {player.name}
                            <CrownIcon src={iconList.crownIcon}></CrownIcon>
                        </li>
                    ) : (
                        <li key={player.id}>{player.name}</li>
                    )
                )}
            </PlayersList>
            {playerDetails?.team !== team.teamColor ||
            playerDetails?.team === Color.GRAY ||
            playerDetails?.isGivingClues ? (
                <JoinTeamBtn color={team.backgroundColor} onClick={joinTeam}>
                    JOIN {team.name.toUpperCase()}
                </JoinTeamBtn>
            ) : (
                <JoinTeamBtn onClick={joinAsLeader}>PLAY AS LEADER</JoinTeamBtn>
            )}
        </TeamCard>
    )
}

export default Team
