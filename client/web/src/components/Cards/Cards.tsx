import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
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
    Container,
    Panel,
} from './Cards.styled'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { GameStatus } from '../../../../../api/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSelectedWord } from '../../store/reducers/playerSlice'
import { IVariants } from '../../interfaces/VariantsInterface'

const Cards = () => {
    const { playerState, userData }: IGameProps = useGameContext()
    const dispatch = useAppDispatch()
    const { selectedWord } = useAppSelector((state) => state.player)
    const [[page, direction], setPage] = useState([0, 0])

    useEffect(() => {
        dispatch(setSelectedWord(0))
    }, [])

    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity
    }

    const variants = {
        enter: ({ direction, i }: IVariants) => {
            return {
                x: direction > 0 ? i * 170 : -500,
            }
        },
        center: ({ i }: IVariants) => ({
            zIndex: 5 - i,
            x: i * 7,
            y: i * 3,
        }),
        exit: ({ direction, i }: IVariants) => {
            return {
                zIndex: 5 - i,
                x: direction < 0 ? 200 : -500,
                opacity: direction < 0 ? 0 : 1,
            }
        },
    }

    const transition = {
        x: { type: 'tween' },
        scale: { type: 'tween', elapsed: 0.1 },
        zIndex: {
            delay: direction > 0 ? 0.15 : 0,
        },
    }

    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const paginate = (newDirection: number) => {
        const newPage = cardIndex(page + newDirection)
        setPage([page + newDirection, newDirection])
        dispatch(setSelectedWord(newPage))
    }

    const cardIndex = (page: number) => {
        if (page >= 0) {
            return Math.abs(page % 5)
        } else {
            return Math.abs((5 + (page % 5)) % 5)
        }
    }

    const cardsArray = playerState.roundInfo?.board
    const cardOnClick = (index: number) => {
        setPage((prev) => {
            const nextDirection = Math.sign(index - prev[0])
            return [index, nextDirection]
        })
        dispatch(setSelectedWord(index))
    }

    return (
        <CardsContainer>
            {playerState?.gameStatus === GameStatus.AUCTION ? (
                <>
                    {!playerDetails?.isGivingClues && <Spacing />}
                    {cardsArray?.map((card, index) => (
                        <PlayingCardAuction key={index}>
                            {playerDetails?.isGivingClues || card.guessed
                                ? card.word.word
                                : card.word.word.split(' ').length > 1
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
                                onClick={() => {
                                    cardOnClick(index)
                                }}
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

                    <Container>
                        <AnimatePresence
                            initial={false}
                            custom={{ direction, page }}
                        >
                            {[...Array(3).keys()].map((index) => (
                                <Panel
                                    key={page + index}
                                    drag={index === 0 && 'x'}
                                    dragConstraints={{
                                        right: 0,
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                    dragElastic={0.5}
                                    custom={{ direction, i: index, page }}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={transition}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = swipePower(
                                            offset.x,
                                            velocity.x
                                        )
                                        if (swipe < -1000 || offset.x < -730) {
                                            paginate(1)
                                        } else if (
                                            swipe > 1000 ||
                                            offset.x > 730
                                        ) {
                                            paginate(-1)
                                        }
                                    }}
                                >
                                    <PlayingCard
                                        key={index}
                                        guessed={
                                            cardsArray?.[
                                                cardIndex(page + index)
                                            ].guessed || false
                                        }
                                    >
                                        <DeckId>
                                            {
                                                cardsArray?.[
                                                    cardIndex(page + index)
                                                ].word.code
                                            }
                                        </DeckId>
                                        <Word>
                                            {playerDetails?.isGivingClues ||
                                            cardsArray?.[
                                                cardIndex(page + index)
                                            ].guessed
                                                ? cardsArray?.[
                                                      cardIndex(page + index)
                                                  ].word.word
                                                : '_ _ _'}
                                        </Word>
                                        <Line short={false} />
                                        <Clues>
                                            <div>HINTS</div>
                                            {cardsArray?.[
                                                cardIndex(page + index)
                                            ].hints.map(
                                                (
                                                    hint: string,
                                                    index: number
                                                ) => (
                                                    <li key={index}>{hint}</li>
                                                )
                                            )}
                                        </Clues>
                                        <Line short={true} />
                                        <Guesses>
                                            <div>GUESSES</div>
                                            {cardsArray?.[
                                                cardIndex(page + index)
                                            ].guesses.map(
                                                (
                                                    guess: string,
                                                    index: number
                                                ) => (
                                                    <li key={index}>{guess}</li>
                                                )
                                            )}
                                        </Guesses>
                                    </PlayingCard>
                                </Panel>
                            ))}
                        </AnimatePresence>
                    </Container>
                </>
            )}
        </CardsContainer>
    )
}

export default Cards
