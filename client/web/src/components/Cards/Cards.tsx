import React, { useEffect } from 'react'
import {
    CardsContainer,
    Spacing,
    PlayingCardAuction,
    PlayingCard,
    DeckId,
    Word,
    Clues,
    Line,
    Guesses,
    CardSelector,
    SelectorElement,
} from './Cards.styled'
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

    useEffect(() => {
        dispatch(setSelectedWord(0))
    }, [])

    const cardsArray = playerState.roundInfo?.board
    const cardOnClick = (index: number) => dispatch(setSelectedWord(index))

    return (
        <CardsContainer>
            {console.log(playerDetails)}
            {playerState?.gameStatus === GameStatus.AUCTION ? (
                <>
                    {!playerDetails?.isGivingClues && <Spacing />}
                    {cardsArray?.map((card, index) => (
                        <PlayingCardAuction key={index}>
                            {playerDetails?.isGivingClues || card.guessed
                                ? card.word
                                : card.word.split(' ').length > 1
                                ? '_ _ _  _ _ _'
                                : '_ _ _'}
                        </PlayingCardAuction>
                    ))}
                </>
            ) : (
                <>
                    <CardSelector>
                        {cardsArray?.map((card, index) => (
                            <SelectorElement
                                key={index}
                                guessed={card.guessed}
                                onClick={() => cardOnClick(index)}
                                isSelected={
                                    selectedWord === index &&
                                    playerState?.gameStatus ===
                                        GameStatus.GUESSING
                                }
                            >
                                {card?.hints.length}
                            </SelectorElement>
                        ))}
                    </CardSelector>
                    {cardsArray?.map(
                        (card, index) =>
                            selectedWord === index && (
                                <PlayingCard
                                    key={index}
                                    guessed={card.guessed}
                                    onClick={() => cardOnClick(index)}
                                >
                                    <DeckId>ax5t6y</DeckId>
                                    <Word>
                                        {playerDetails?.isGivingClues ||
                                        card.guessed
                                            ? card.word
                                            : '_ _ _'}
                                    </Word>
                                    <Line short={false} />
                                    <Clues>
                                        <div>HINTS</div>
                                        {card.hints.map(
                                            (hint: string, index: number) => (
                                                <li key={index}>{hint}</li>
                                            )
                                        )}
                                    </Clues>
                                    <Line short={true} />
                                    <Guesses>
                                        <div>GUESSES</div>
                                        {card.guesses.map(
                                            (guess: string, index: number) => (
                                                <li key={index}>{guess}</li>
                                            )
                                        )}
                                    </Guesses>
                                </PlayingCard>
                            )
                    )}
                </>
            )}
        </CardsContainer>
    )
}

export default Cards
