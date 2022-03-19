import React, { useState } from 'react'
import {
    Center,
    Container,
    Header,
    HeaderContainer,
    FlexCol,
    JoinButton,
    Spacing,
    Text,
    Input,
} from './JoinGame.styled'

interface IJoinProps {
    handleJoin: (nickname: string) => void
}

const JoinGame = ({ handleJoin }: IJoinProps) => {
    const [nickname, setNickname] = useState<string>('')
    const handleSetNickname = (e: React.ChangeEvent<HTMLInputElement>) =>
        setNickname(e.target.value)

    return (
        <>
            <Center>
                <Container>
                    <HeaderContainer>
                        <Header>Welcome to the game</Header>
                    </HeaderContainer>
                    <FlexCol>
                        <Spacing>
                            <Text>Podaj swój nick</Text>
                        </Spacing>
                        <Spacing>
                            <Input
                                type="text"
                                maxLength={10}
                                placeholder="Your nickname"
                                onChange={handleSetNickname}
                            />
                        </Spacing>
                        <Spacing>
                            <JoinButton
                                type="button"
                                onClick={() => handleJoin(nickname)}
                            >
                                Create room
                            </JoinButton>
                        </Spacing>
                    </FlexCol>
                </Container>
            </Center>
        </>
    )
}

export default JoinGame
