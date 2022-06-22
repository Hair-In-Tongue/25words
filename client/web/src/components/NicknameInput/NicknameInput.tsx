import React, { useState } from 'react'
import { useGameContext } from '../../context/GameProvider'
import { useAppDispatch } from '../../store/hooks'
import { Form, Icon, Input, SubmitButton } from './NicknameInput.styled'
import { iconList } from '../../assets'
import { useTranslation } from 'react-i18next'
import { setNickname } from '../../store/reducers/playerSlice'

const NicknameInput = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { client } = useGameContext()

    const [newNickname, setNewNickname] = useState<string>('')

    const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.includes(' ')) {
            e.target.value = e.target.value.replace(/\s/g, '')
        }
        setNewNickname(e.target.value)
    }

    const changeNickname = async () => {
        if (newNickname) {
            dispatch(setNickname(newNickname))
            await client?.changeName({ name: newNickname })
            setNewNickname('')
        }
    }

    return (
        <>
            <Form>
                <Input
                    type="text"
                    value={newNickname}
                    onChange={onChangeNickname}
                    placeholder={t('settings.setNickname')}
                />
                <SubmitButton type="button" onClick={changeNickname}>
                    <Icon src={iconList.done} />
                </SubmitButton>
            </Form>
        </>
    )
}

export default NicknameInput
