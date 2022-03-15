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
import { useHistory } from 'react-router-dom'

function Title() {
    const [nickname, setNickname] = useState<string>('')
    const handleSetNickname = (e) => setNickname(e.target.value)
    const history = useHistory()

    const createGame = () => {
        return history.push('/room', {
            nickname,
        })
    }

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
                                placeholder="Your nickname"
                                onChange={handleSetNickname}
                            />
                        </Spacing>
                        <Spacing>
                            <JoinButton type="button" onClick={createGame}>
                                Create room
                            </JoinButton>
                        </Spacing>
                    </FlexCol>
                </Container>
            </Center>
        </>
    )
}

export default Title
