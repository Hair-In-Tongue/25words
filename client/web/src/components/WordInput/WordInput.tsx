import React, { useState } from 'react'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { useAppSelector } from '../../store/hooks'
import { Container } from './WordInput.styled'

const WordInput = () => {
    const { client, playerState, userData }: IGameProps = useGameContext()
    const { selectedWord } = useAppSelector((state) => state.player)

    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })
    const [word, setWord] = useState<string>('')

    const giveClue = async () => {
        await client?.giveClue({ word: selectedWord, hint: word })
    }
    const guessWord = async () => {
        await client?.guessWord({ word: selectedWord, guess: word })
    }

    const onChangeWord = (e: React.ChangeEvent<HTMLInputElement>) =>
        setWord(e.target.value)

    const onSubmitWord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(selectedWord)
        console.log(word)
        if (!word) return
        if (selectedWord < 0) return
        if (playerDetails?.isGivingClues) {
            giveClue()
        } else {
            guessWord()
        }
    }

    return (
        <>
            {playerState.roundInfo?.currentTurn === playerDetails?.team && (
                <Container>
                    {playerDetails?.isGivingClues ? (
                        <div>Give clue</div>
                    ) : (
                        <div>Guess</div>
                    )}
                    <form onSubmit={onSubmitWord}>
                        <input
                            type="text"
                            value={word}
                            onChange={onChangeWord}
                            placeholder="Your word"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </Container>
            )}
        </>
    )
}

export default WordInput
