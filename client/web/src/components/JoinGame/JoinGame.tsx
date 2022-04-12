import React, { useState } from 'react'
import {
    Container,
    Header,
    HeaderContainer,
    FlexCol,
    JoinButton,
    Input,
} from './JoinGame.styled'
import { BackgroundImage, Gradient } from '../GameLayout/GameLayout.styled'
import { Color } from '../../../../../api/types'

interface IJoinProps {
    handleJoin: (nickname: string) => void
    buttonName: string
}

const JoinGame = ({ handleJoin }: IJoinProps) => {
    const [nickname, setNickname] = useState<string>('')
    const handleSetNickname = (e: React.ChangeEvent<HTMLInputElement>) =>
        setNickname(e.target.value)

    return (
        <>
            <FlexCol>
                <Container>
                    <HeaderContainer>
                        <Header>25</Header>
                        <Header>WORDS</Header>
                        <Header>Can you guess them?</Header>
                    </HeaderContainer>
                    <FlexCol>
                        <Input
                            type="text"
                            maxLength={10}
                            placeholder="Your nickname"
                            onChange={handleSetNickname}
                        />
                        <JoinButton
                            type="button"
                            onClick={() => handleJoin(nickname)}
                        >
                            JOIN ROOM
                        </JoinButton>
                    </FlexCol>
                    <Gradient currentTurn={Color.GRAY} />
                </Container>
                <BackgroundImage />
            </FlexCol>
        </>
    )
}

export default JoinGame
