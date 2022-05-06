import React, { useState } from 'react'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { useAppSelector } from '../../store/hooks'
import { Container, Form, Icon, Input, SubmitButton } from './WordInput.styled'
import { iconList } from '../../assets'

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
        setWord('')
    }
    const guessWord = async () => {
        await client?.guessWord({ word: selectedWord, guess: word })
        setWord('')
    }

    const onChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.includes(' ')) {
            e.target.value = e.target.value.replace(/\s/g, '')
        }
        setWord(e.target.value)
    }

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
                    <Form onSubmit={onSubmitWord}>
                        <Input
                            type="text"
                            value={word}
                            onChange={onChangeWord}
                            placeholder={
                                playerDetails?.isGivingClues
                                    ? 'Leaders hint'
                                    : 'Players guess'
                            }
                        />
                        <SubmitButton type="submit">
                            <Icon src={iconList.done} />
                        </SubmitButton>
                    </Form>
                </Container>
            )}
        </>
    )
}

export default WordInput
