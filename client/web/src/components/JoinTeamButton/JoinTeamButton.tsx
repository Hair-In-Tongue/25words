import React from 'react'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { Color } from '../../../../../api/types'
import { setLoading } from '../../store/reducers/loadingSlice'
import { useAppDispatch } from '../../store/hooks'
import { useTranslation } from 'react-i18next'
import { IJoinTeamButton } from '../../interfaces/JoinTeamButtonInterface'
import { JoinTeamBtn, JoinSpectator } from './JoinTeamButton.styled'

const JoinTeamButton = ({ teamColor, color, btnWidth }: IJoinTeamButton) => {
    const { client, userData, playerState }: IGameProps = useGameContext()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const team = playerState.teams?.find((t) => t.color === teamColor)
    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const joinTeam = async () => {
        dispatch(setLoading(true))
        await client?.joinTeam({ team: teamColor })
        dispatch(setLoading(false))
    }

    const joinAsLeader = async () => {
        dispatch(setLoading(true))
        await client?.joinAsLeader({ team: teamColor })
        dispatch(setLoading(false))
    }

    return teamColor === Color.GRAY ? (
        <JoinSpectator
            color={color}
            btnWidth={btnWidth || '100%'}
            onClick={joinTeam}
        >
            {t('buttons.spectate')}
        </JoinSpectator>
    ) : playerDetails?.team !== team?.color ||
      playerDetails?.team === Color.GRAY ||
      playerDetails?.isGivingClues ? (
        <JoinTeamBtn
            color={color}
            btnWidth={btnWidth || '112px'}
            onClick={joinTeam}
        >
            {t('buttons.joinTeam')}
        </JoinTeamBtn>
    ) : (
        <JoinTeamBtn
            color={color}
            btnWidth={btnWidth || '112px'}
            onClick={joinAsLeader}
        >
            {t('buttons.leadTeam')}
        </JoinTeamBtn>
    )
}

export default JoinTeamButton
