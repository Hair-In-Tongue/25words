import React from 'react'
import { RadioLabel, RadioButton } from './Level.styled'
import { Difficulty } from '../../../../../api/types'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { useGameContext } from '../../context/GameProvider'
import { ILevel } from '../../interfaces/LevelInterface'
import { setLoading } from '../../store/reducers/loadingSlice'
import { useAppDispatch } from '../../store/hooks'

const Level = ({ difficulty }: ILevel) => {
    const dispatch = useAppDispatch()
    const { client, playerState }: IGameProps = useGameContext()
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
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </RadioLabel>
        </>
    )
}
export default Level
