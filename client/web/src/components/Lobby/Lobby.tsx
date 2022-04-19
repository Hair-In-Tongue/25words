import React from 'react'
import {
    Container,
    Teams,
    JoinTeamBtn,
    JoinSpectator,
    FlexBetween,
    Settings,
    DifficultyContainer,
    TimeSettings,
    SwitchLabel,
    Switch,
    GuessingTime,
    Time,
    StartButton,
    Button,
} from './Lobby.styled'
import Level from '../Level/Level'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { Color, Difficulty } from '../../../../../api/types'
import { setLoading } from '../../store/reducers/loadingSlice'
import { useAppDispatch } from '../../store/hooks'

const Lobby = () => {
    const { client }: IGameProps = useGameContext()
    const dispatch = useAppDispatch()

    const startGame = async () => {
        await client?.startGame({})
    }

    const joinTeam = async (e) => {
        dispatch(setLoading(true))
        const teamColor: Color = e.target.value
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
                        JOIN
                    </JoinTeamBtn>
                    <JoinTeamBtn
                        color={'#95123A'}
                        value={Color.RED}
                        onClick={joinTeam}
                    >
                        JOIN
                    </JoinTeamBtn>
                </FlexBetween>
                <JoinSpectator
                    color={'#E3D5C5'}
                    value={Color.GRAY}
                    onClick={joinTeam}
                >
                    SPECTATE
                </JoinSpectator>
            </Teams>
            <Settings>
                <DifficultyContainer>
                    <Level difficulty={Difficulty.EASY} />
                    <Level difficulty={Difficulty.NORMAL} />
                    <Level difficulty={Difficulty.HARD} />
                </DifficultyContainer>
                <TimeSettings>
                    <GuessingTime>
                        Guessing time
                        <Switch id="guessing-time" type="checkbox"></Switch>
                        <SwitchLabel htmlFor="guessing-time" />
                    </GuessingTime>
                    <Time type="text" defaultValue={'1:30'}></Time>
                </TimeSettings>
            </Settings>
            <StartButton onClick={() => startGame()}>START ROUND</StartButton>
            <FlexBetween>
                <Button color={'#005956'} onClick={shuffleTeams}>
                    Mix Teams
                </Button>
                <Button color={'#95123A'}>Reset Score</Button>
            </FlexBetween>
        </Container>
    )
}

export default Lobby
