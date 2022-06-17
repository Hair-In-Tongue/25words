import React from 'react'
import { RadioLabel, RadioButton } from './Level.styled'
import { Difficulty } from '../../../../../api/types'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { useGameContext } from '../../context/GameProvider'
import { ILevel } from '../../interfaces/LevelInterface'
import { setLoading } from '../../store/reducers/loadingSlice'
import { useAppDispatch } from '../../store/hooks'
import { useTranslation } from 'react-i18next'

const Level = ({ difficulty }: ILevel) => {
    const dispatch = useAppDispatch()
    const { client, playerState }: IGameProps = useGameContext()
    const { t } = useTranslation()
    const name = Difficulty[difficulty].toLowerCase()

    const changeDifficulty = async () => {
        dispatch(setLoading(true))
        await client?.setDifficulty({
            name: difficulty,
        })
        dispatch(setLoading(false))
    }

    return (
        <>
            <RadioButton
                id={`diff-${difficulty}`}
                type="radio"
                name="difficulty"
                value={`diff-${difficulty}`}
                onChange={() => changeDifficulty()}
                checked={playerState.roundInfo?.difficulty === difficulty}
            />
            <RadioLabel htmlFor={`diff-${difficulty}`}>
                {t(`buttons.${name}`)}
            </RadioLabel>
        </>
    )
}
export default Level
