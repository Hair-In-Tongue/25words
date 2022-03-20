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

const Team = ({ name, backgroundColor, teamColor }: ITeamProps) => {
    const { client, playerState, userData }: IGameProps = useGameContext()

    const team = playerState.teams?.find((t) => t.color === teamColor)
    const teamPlayers = playerState.players.filter((p) => p.team === teamColor)

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

    return (
            <TeamCard color={backgroundColor}>
                <Score>
                    {name} {team?.points}
                </Score>
                <PlayersList>
                    {sortTeam(teamPlayers).map((player: PlayerInfo) =>
                        player.isGivingClues && player.team !== Color.GRAY ? (
                            <li key={player.id}>
                                <CrownIcon
                                    wrapper="svg"
                                    src={iconList.crownIcon}
                                />
                                {player.name}
                                <CrownIcon
                                    wrapper="svg"
                                    src={iconList.crownIcon}
                                />
                            </li>
                        ) : (
                            <li key={player.id}>{player.name}</li>
                        )
                    )}
                </PlayersList>
                {playerDetails?.team !== team.teamColor ||
                playerDetails?.team === Color.GRAY ||
                playerDetails?.isGivingClues ? (
                    <JoinTeamBtn
                        color={team.backgroundColor}
                        onClick={joinTeam}
                    >
                        JOIN {team.name.toUpperCase()}
                {playerDetails?.team !== teamColor ||
                playerDetails?.team === Color.GRAY ||
                playerDetails?.isGivingClues ? (
                    <JoinTeamBtn color={backgroundColor} onClick={joinTeam}>
                        JOIN {name.toUpperCase()}
                    </JoinTeamBtn>
                ) : (
                    <JoinTeamBtn onClick={joinAsLeader}>
                        PLAY AS LEADER
                    </JoinTeamBtn>
                )}
            </TeamCard>
    )
}

export default Team
