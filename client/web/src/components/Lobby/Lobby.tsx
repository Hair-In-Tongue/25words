import React, { useState } from 'react'
import {
    Container,
    Teams,
    JoinTeamBtn,
    JoinSpectator,
    FlexBetween,
    Settings,
    DifficultyContainer,
    TimeSettings,
    GuessingTime,
    Time,
    StartButton,
    Button,
    Divider,
} from './Lobby.styled'
import Level from '../Level/Level'
import Toggle from '../Toggle/Toggle'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { Color, Difficulty } from '../../../../../api/types'
import { setLoading } from '../../store/reducers/loadingSlice'
import { useAppDispatch } from '../../store/hooks'
import { useTranslation } from 'react-i18next'

const Lobby = () => {
    const { client }: IGameProps = useGameContext()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [toggleTime, setToggleTime] = useState(false)

    const startGame = async () => {
        await client?.startGame({})
    }

    const joinTeam = async (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setLoading(true))
        const teamColor: Color = e.currentTarget.value as unknown as Color
        await client?.joinTeam({ team: teamColor })
        dispatch(setLoading(false))
    }

    const shuffleTeams = async () => {
        client?.shuffleTeams({})
    }

    return (
        <Container>
            <Teams>
                <FlexBetween>
                    <JoinTeamBtn
                        color={'#005956'}
                        value={Color.BLUE}
                        onClick={joinTeam}
                    >
                        {t('buttons.joinTeam')}
                    </JoinTeamBtn>
                    <JoinTeamBtn
                        color={'#95123A'}
                        value={Color.RED}
                        onClick={joinTeam}
                    >
                        {t('buttons.joinTeam')}
                    </JoinTeamBtn>
                </FlexBetween>
                <JoinSpectator
                    color={'#E3D5C5'}
                    value={Color.GRAY}
                    onClick={joinTeam}
                >
                    {t('buttons.spectate')}
                </JoinSpectator>
            </Teams>
            <Divider />
            <Settings>
                <DifficultyContainer>
                    <Level difficulty={Difficulty.EASY} />
                    <Level difficulty={Difficulty.NORMAL} />
                    <Level difficulty={Difficulty.HARD} />
                </DifficultyContainer>
                <TimeSettings>
                    <GuessingTime>
                        {t('game.guessingTime')}
                        <Toggle
                            on={toggleTime}
                            onClick={() => setToggleTime(!toggleTime)}
                        />
                    </GuessingTime>
                    <Time type="text" defaultValue={'1:30'}></Time>
                </TimeSettings>
            </Settings>
            <StartButton onClick={() => startGame()}>
                {t('buttons.startRound')}
            </StartButton>
            <FlexBetween>
                <Button color={'#005956'} onClick={shuffleTeams}>
                    {t('game.mixTeams')}
                </Button>
                <Button color={'#95123A'}>{t('game.resetScore')}</Button>
            </FlexBetween>
        </Container>
    )
}

export default Lobby
