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
import { Difficulty } from '../../../../../api/types'

const Lobby = () => {
    const { client }: IGameProps = useGameContext()

    const startGame = async () => {
        await client?.startGame({})
    }

    return (
        <Container>
            <Teams>
                <FlexBetween>
                    <JoinTeamBtn color={'#005956'}>JOIN</JoinTeamBtn>
                    <JoinTeamBtn color={'#95123A'}>JOIN</JoinTeamBtn>
                </FlexBetween>
                <JoinSpectator color={'#E3D5C5'}>SPECTATE</JoinSpectator>
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
                <Button color={'#005956'}>Mix Teams</Button>
                <Button color={'#95123A'}>Reset Score</Button>
            </FlexBetween>
        </Container>
    )
}

export default Lobby
