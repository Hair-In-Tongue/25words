import styled from 'styled-components'

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
    height: 32px;
    font-size: 24px;
    outline: none;
    border: none;
    background-color: ${({ theme: { colors }, guessed, isSelected }) =>
        guessed
            ? colors.guessedCardBackground
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

export const PlayingCard = styled.div<{
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

export const Clues = styled.ul`
    overflow-y: auto;
    width: 90%;
    height: 126px;
    margin: 0;
    list-style: none;
    padding: 0;
    text-align: center;
    div {
        font-size: 16px;
        color: #453f38;
    }
    li {
        color: black;
        font-size: 18px;
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
