import { PlayerState } from '../../../../api/types'
import { HathoraConnection } from '../../../.hathora/client'

export interface IUserData {
    token: string
    id: string
    name: string
}

export interface IGameProps {
    userData: IUserData
    playerState: PlayerState
    client?: HathoraConnection
}
