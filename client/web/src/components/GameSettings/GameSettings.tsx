import React from 'react'
import { Color, PlayerInfo } from '../../../../../api/types'
import { Container } from './GameSettings.styled'
import { useGameContext } from '../../context/GameProvider'
import { ITeamProps } from '../../interfaces/TeamInterface'
import { IGameProps } from '../../interfaces/GlobalInterface'

const GameSettings = ({ name, backgroundColor, teamColor }: ITeamProps) => {
    const { client, playerState, userData }: IGameProps = useGameContext()

    return <Container></Container>
}

export default GameSettings
