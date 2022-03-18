import { PlayerState, Color, PlayerInfo } from '../../../../api/types'
import { HathoraConnection } from '../../../.hathora/client'

export interface IUserData {
    token: string
    id: string
    name: string
}

export interface ILobbyProps {
    userData: IUserData
    playerState: PlayerState
    client: HathoraConnection
}

export interface Props {
    color: string
}

export interface ITeamProps {
    team: ITeam
    client: HathoraConnection
    userData: IUserData
    playerState: PlayerState
}

export interface ITeam {
    name: string
    backgroundColor: string
    players: Array<PlayerInfo>
    teamColor: Color
}
