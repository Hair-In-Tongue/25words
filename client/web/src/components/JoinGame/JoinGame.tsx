import React, { useState } from 'react'
import {
    Container,
    Header,
    HeaderContainer,
    FlexCol,
    Card,
    JoinButton,
    Input,
} from './JoinGame.styled'
import { BackgroundImage, Gradient } from '../GameLayout/GameLayout.styled'
import { Color } from '../../../../../api/types'
import { IJoinProps } from '../../interfaces/JoinGameInterface'
import { useTranslation } from 'react-i18next'

const JoinGame = ({ handleJoin }: IJoinProps) => {
    const { t } = useTranslation()
    const [nickname, setNickname] = useState<string>('')
    const handleSetNickname = (e: React.ChangeEvent<HTMLInputElement>) =>
        setNickname(e.target.value)

    return (
        <>
            <FlexCol>
                <Container>
                    <HeaderContainer>
                        <Header>{t('game.title.number')}</Header>
                        <Header>{t('game.title.text')}</Header>
                        <Header>{t('game.title.canYouGuesThem')}</Header>
                    </HeaderContainer>
                    <Card>
                        <form
                            onSubmit={(e) => {
                                if (nickname) {
                                    handleJoin(nickname)
                                }
                                e.preventDefault()
                            }}
                        >
                            <Input
                                type="text"
                                maxLength={10}
                                placeholder={t('game.nicknamePlaceholder')}
                                onChange={handleSetNickname}
                            />
                            <JoinButton
                                type="submit"
                                onClick={() => {
                                    if (nickname) {
                                        handleJoin(nickname)
                                    }
                                }}
                            >
                                {t('buttons.joinGame')}
                            </JoinButton>
                        </form>
                    </Card>
                    <Gradient currentTurn={Color.GRAY} />
                </Container>
                <BackgroundImage />
            </FlexCol>
        </>
    )
}

export default JoinGame
