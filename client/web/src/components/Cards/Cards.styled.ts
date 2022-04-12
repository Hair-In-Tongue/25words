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
    isSelected: boolean
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
    box-shadow: ${({ isSelected, theme }) =>
        isSelected ? '5px 5px 10px -1px ' + theme.colors.selectedCard : 'none'};
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

export const Line = styled.div`
    width: 172px;
    height: 4px;
    background-color: ${({ theme: { colors } }) => colors.cardOutline};
    margin-bottom: 4px;
`

export const Word = styled.div`
    margin-top: 18px;
    margin-bottom: 18px;
    overflow-wrap: break-word;
    font-size: 24px;
    font-weight: 400;
    margin-left: auto;
    margin-right: auto;
`

export const Clues = styled.ul`
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
`

export const Guesses = styled(Clues)`
    li {
        font-size: 16px;
    }
`
