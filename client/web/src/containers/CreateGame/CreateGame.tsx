import React from 'react'
import { useHistory } from 'react-router-dom'
import JoinGame from '../../components/JoinGame/JoinGame'
import { CreateGameContainer } from './CreateGame.styled'
import { useAppDispatch } from '../../store/hooks'
import { setNickname, setIsCreator } from '../../store/reducers/playerSlice'
import Header from '../../components/GameLayout/Header/Header'
import { useTranslation } from 'react-i18next'

const CreateGame = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const createGame = (nickname: string) => {
        dispatch(setNickname(nickname))
        dispatch(setIsCreator(true))
        return history.push('/room')
    }

    return (
        <CreateGameContainer>
            <Header />
            <JoinGame
                handleJoin={createGame}
                buttonName={t('buttons.createGame')}
            />
        </CreateGameContainer>
    )
}

export default CreateGame
