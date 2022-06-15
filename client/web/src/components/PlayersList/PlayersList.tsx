import React from 'react'
import {
    List,
    TeamName,
    ListItem,
    KickButton,
    Icon,
    TeamColor,
    PlayerInfo,
} from './PlayersList.styled'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { iconList } from '../../assets'

interface TestowyI {
    backgroundColor: string
    teamName: string
}

const PlayersList = ({ backgroundColor, teamName }: TestowyI) => {
    const { playerState, client, userData }: IGameProps = useGameContext()

    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const players = playerState?.players

    const KickPlayer = async (userId: string) => {
        await client?.kickPlayer({ player: userId })
    }

    return (
        <>
            <TeamName>{teamName}</TeamName>
            <List>
                {players.map((player) => (
                    <ListItem color={backgroundColor} key={player?.id}>
                        <PlayerInfo>
                            <TeamColor />
                            {player?.name}
                        </PlayerInfo>

                        {playerDetails?.isAdmin && (
                            <KickButton onClick={() => KickPlayer(player?.id)}>
                                <Icon src={iconList.kickIcon} />
                            </KickButton>
                        )}
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default PlayersList
