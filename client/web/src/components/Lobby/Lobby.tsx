import React, { useState } from 'react'
import {
    Container,
    Teams,
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
import { useTranslation } from 'react-i18next'
import JoinTeamButton from '../JoinTeamButton/JoinTeamButton'

const Lobby = () => {
    const { client, playerState, userData }: IGameProps = useGameContext()
    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })
    const { t } = useTranslation()
    const [toggleTime, setToggleTime] = useState(false)

    const startGame = async () => {
        await client?.startGame({})
    }

    const shuffleTeams = async () => {
        client?.shuffleTeams({})
    }

    return (
        <Container>
            <Teams>
                <FlexBetween>
                    <JoinTeamButton color={'#005956'} teamColor={Color.BLUE} />
                    <JoinTeamButton color={'#95123A'} teamColor={Color.RED} />
                </FlexBetween>
                <JoinTeamButton color={'#E3D5C5'} teamColor={Color.GRAY} />
            </Teams>
            {playerDetails?.isAdmin && (
                <>
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
                                    on={toggleTime ? 1 : 0}
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
                        <Button color={'#95123A'}>
                            {t('game.resetScore')}
                        </Button>
                    </FlexBetween>
                </>
            )}
        </Container>
    )
}

export default Lobby
