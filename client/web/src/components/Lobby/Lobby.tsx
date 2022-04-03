import React from 'react'
import {
    Container,
    Teams,
    JoinTeamBtn,
    JoinSpectator,
    FlexBetween,
    Settings,
    Difficulty,
    RadioButton,
    RadioLabel,
    TimeSettings,
    SwitchLabel,
    Switch,
    GuessingTime,
    Time,
    StartButton,
    Button,
} from './Lobby.styled'

import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'

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
                <Difficulty>
                    <RadioButton
                        id="easy"
                        type="radio"
                        name="difficulty"
                        value="easy"
                    />
                    <RadioLabel htmlFor="easy">Easy</RadioLabel>
                    <RadioButton
                        defaultChecked
                        id="medium"
                        type="radio"
                        name="difficulty"
                        value="medium"
                    />
                    <RadioLabel htmlFor="medium">Medium</RadioLabel>
                    <RadioButton
                        id="hard"
                        type="radio"
                        name="difficulty"
                        value="hard"
                    />
                    <RadioLabel htmlFor="hard">Hard</RadioLabel>
                </Difficulty>
                <TimeSettings>
                    <GuessingTime>
                        Guessing time
                        <Switch id="guessing-time" type="checkbox"></Switch>
                        <SwitchLabel htmlFor="guessing-time" />
                    </GuessingTime>
                    <Time type="text" defaultValue={'1:30'}></Time>
                </TimeSettings>
            </Settings>
            <StartButton>START ROUND</StartButton>
            <FlexBetween>
                <Button color={'#005956'}>Mix Teams</Button>
                <Button color={'#95123A'}>Reset Score</Button>
            </FlexBetween>
        </Container>
    )
}

export default Lobby
