import React from 'react'
import { useTranslation } from 'react-i18next'
import { Title, Container } from './PlayersListModal.styled'
import { useGameContext } from '../../../context/GameProvider'
import { IGameProps } from '../../../interfaces/GlobalInterface'
import { Color } from '../../../../../../api/types'
import PlayersList from '../../PlayersList/PlayersList'
import theme from '../../../theme'

const PlayersListModal = () => {
    const { t } = useTranslation()
    const { playerState }: IGameProps = useGameContext()
    const players = playerState?.players

    const isSpectatorPlayer = players.find((p) => p.team === Color.GRAY)
    const isRedPlayer = players.find((p) => p.team === Color.RED)
    const isBluePlayer = players.find((p) => p.team === Color.BLUE)

    return (
        <>
            <Title>{t('playersList.players')}</Title>
            <Container>
                {isRedPlayer && (
                    <PlayersList
                        backgroundColor={theme.colors.redTeam}
                        teamName={t('playersList.red')}
                    />
                )}
                {isBluePlayer && (
                    <PlayersList
                        backgroundColor={theme.colors.blueTeam}
                        teamName={t('playersList.blue')}
                    />
                )}
                {isSpectatorPlayer && (
                    <PlayersList
                        backgroundColor={theme.colors.grayTeamDark}
                        teamName={t('playersList.spectators')}
                    />
                )}
            </Container>
        </>
    )
}

export default PlayersListModal
