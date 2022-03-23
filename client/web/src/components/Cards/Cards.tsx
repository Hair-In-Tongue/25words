import React from 'react'
import { CardsColumn, PlayingCard, Word, Clues, Line } from './Cards.styled'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { GameStatus } from '../../../../../api/types'

const Board = () => {
    const { playerState, userData }: IGameProps = useGameContext()

    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const cardsArray = playerState.roundInfo?.board

    return (
        <CardsColumn>
            {console.log(playerState)}
            {cardsArray?.map((card, index) => (
                <PlayingCard key={index} guessed={card.guessed}>
                    <Word>
                        {playerDetails?.isGivingClues || card.guessed
                            ? card.word
                            : '***'}
                    </Word>
                    <Line></Line>
                    <Clues>
                        {!(card.hints.length === 0)
                            ? card.hints.map((hint: string, index: number) => (
                                  <li key={index}>{hint}</li>
                              ))
                            : playerState.gameStatus ===
                                  GameStatus.GUESSING && <div>clues map</div>}
                    </Clues>
                </PlayingCard>
            ))}
        </CardsColumn>
    )
}

export default Board
