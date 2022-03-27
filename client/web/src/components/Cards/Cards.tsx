import React from 'react'
import { CardsColumn, PlayingCard, Word, Clues, Line, Guesses } from './Cards.styled'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { GameStatus } from '../../../../../api/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSelectedWord } from '../../store/reducers/playerSlice'

const Cards = () => {
    const { playerState, userData }: IGameProps = useGameContext()
    const dispatch = useAppDispatch()
    const { selectedWord } = useAppSelector((state) => state.player)

    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const cardsArray = playerState.roundInfo?.board
    const cardOnClick = (index: number) => dispatch(setSelectedWord(index))

    return (
        <CardsColumn>
            {console.log(playerState)}
            {cardsArray?.map((card, index) => (
                <PlayingCard
                    key={index}
                    guessed={card.guessed}
                    onClick={() => cardOnClick(index)}
                    isSelected={selectedWord === index}
                >
                    <Word>
                        {playerDetails?.isGivingClues || card.guessed
                            ? card.word
                            : '***'}
                    </Word>
                    <Line></Line>
                    <Clues>
                        <div>CLUES</div>
                        {card.hints.map((hint: string, index: number) => (
                            <li key={index}>{hint}</li>
                        ))}
                    </Clues>
                    <Guesses>
                        <div>GUESSES</div>
                        {card.guesses.map((guess: string, index: number) => (
                            <li key={index}>{guess}</li>
                        ))}
                    </Guesses>
                </PlayingCard>
            ))}
        </CardsColumn>
    )
}

export default Cards
