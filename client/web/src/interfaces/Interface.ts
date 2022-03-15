import { PlayerState } from '../../../../api/types'
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
