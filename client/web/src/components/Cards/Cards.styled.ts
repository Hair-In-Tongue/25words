import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { ReactSVG } from 'react-svg'

export const CardSelector = styled.div`
    display: flex;
    margin: 20px 0px;
    width: 260px;
    height: 32px;
    overflow: hidden;
    border-radius: 16px;
    border: 2px solid ${({ theme: { colors } }) => colors.cardOutline};
`

export const SelectorElement = styled.button<{
    guessed: boolean
    isSelected: boolean
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 52px;
    font-size: 24px;
    outline: none;
    border: none;
    background-color: ${({ theme: { colors }, guessed, isSelected }) =>
        guessed
            ? isSelected
                ? 'rgba(211, 237, 165, 1)'
                : colors.guessedCardBackground
            : isSelected
            ? colors.selectedCard
            : colors.cardBackground};
    &:not(:first-child) {
        border-left: 2px solid ${({ theme: { colors } }) => colors.cardOutline};
    }
`

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Spacing = styled.div`
    height: 16px;
    width: 100px;
`

export const PlayingCard = styled(motion.div)<{
    guessed: boolean
}>`
    width: 244px;
    height: 342px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin-top: 4px;
    border-radius: 16px;
    border: 1px solid ${({ theme: { colors } }) => colors.cardOutline};
    box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.45);
    background-color: ${({ guessed, theme }) =>
        guessed
            ? theme.colors.guessedCardBackground
            : theme.colors.cardBackground};
`

export const PlayingCardAuction = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
    width: 268px;
    height: 52px;
    border-radius: 16px;
    font-size: 24px;
    font-weight: 400;
    color: black;
    background-color: ${({ theme: { colors } }) => colors.cardBackground};
    border: 3px solid ${({ theme: { colors } }) => colors.cardOutline};
`

export const Line = styled.div<{ short: boolean }>`
    width: ${({ short }) => (short ? '130px' : '172px')};
    height: 4px;
    border-radius: 2px;
    background-color: ${({ theme: { colors } }) => colors.cardOutline};
    margin-bottom: 4px;
`

export const DeckId = styled.div`
    width: 230px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 18px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
`

export const Word = styled.div`
    margin-top: 9px;
    margin-bottom: 9px;
    overflow-wrap: break-word;
    font-size: 24px;
    font-weight: 400;
    margin-left: auto;
    margin-right: auto;
`

export const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 122px;
    div {
        font-size: 16px;
        color: #453f38;
        margin-bottom: 4px;
    }
`

export const Clues = styled(motion.ul)`
    overflow-y: auto;
    width: 90%;
    height: 100%;
    margin: 0;
    list-style: none;
    padding: 0;
    text-align: center;
    li {
        color: black;
        font-size: 18px;
        letter-spacing: 1.1;
        line-height: 1.15;
        overflow: hidden;
    }
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track {
        display: none;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.4);
    }
`

export const Guesses = styled(Clues)`
    li {
        font-size: 16px;
    }
`

export const Container = styled.div`
    height: 342px;
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
`

export const Panel = styled(motion.div)`
    position: absolute;
`

export const ArrowContainer = styled.div<{ top: number }>`
    pointer-events: none;
    position: absolute;
    top: ${({ top }) => top}px;
    margin-left: auto;
    width: 380px;
    z-index: 7;
    ${({ theme: { devices } }) => css`
        ${devices.mobile} {
            display: none;
        }

        ${devices.tablet} {
            display: flex;
            justify-content: space-between;
        }
    `}
`

export const Triangle = styled(ReactSVG)<{ direction: string }>`
    padding: 0;
    z-index: 8;
    path {
        ${({ theme: { colors } }) =>
            `fill: ${colors.blueBackground};
             stroke: ${colors.blueOutline}`};
        stroke-width: 3px;
    }
`

export const Arrow = styled.button<{ direction: string }>`
    pointer-events: auto;
    padding: 8px 0;
    border: none;
    background: transparent;
    transform: scale(0.75);
    z-index: 8;
    ${Triangle} {
        ${({ direction }) =>
            direction === 'left'
                ? 'transform: rotate(-90deg)'
                : 'transform: rotate(90deg)'};
    }
`
