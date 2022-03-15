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
import { rootCertificates } from 'tls'

function Title() {
    const [nickname, setNickname] = useState<string>('')
    const handleSetNickname = (e) => setNickname(e.target.value)
    const history = useHistory()

    const createGame = () => {
        localStorage.setItem('nickname', nickname)
        history.push('/room')
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
                                maxLength={10}
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
