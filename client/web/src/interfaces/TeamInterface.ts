import { Color, PlayerInfo } from '../../../../api/types'

export interface ITeamProps {
    team: ITeam
}

export interface ITeam {
    name: string
    backgroundColor: string
    players: Array<PlayerInfo>
    teamColor: Color
}
