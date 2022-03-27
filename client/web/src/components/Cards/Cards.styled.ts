import styled from 'styled-components'

export const CardsColumn = styled.div`
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.25rem;
    padding: 1rem 1rem;
`

export const PlayingCard = styled.div<{ guessed: boolean, isSelected: boolean }>`
    display: grid;
    justify-items: center;
    grid-template-rows: auto auto 6rem;
    row-gap: 1px;
    border-radius: 5px;
    box-shadow: ${({ isSelected, theme }) => isSelected
        ? ('5px 5px 10px -1px ' + theme.colors.selectedCard)
        : 'none'};
    padding: 1rem;
    margin: 0.25rem;
    min-width: 10rem;
    background-color: ${({ guessed, theme }) =>
        guessed ? theme.colors.guessedCardBackground : theme.colors.cardBackground};
`

export const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.2);
`

export const Word = styled.div`
    overflow-wrap: break-word;
    font-size: 1.1rem;
    font-weight: 500;
    margin-left: auto;
    margin-right: auto;
`

export const Clues = styled.ul`
    margin: 0;
    list-style: none;
    padding: 0;
`

export const Guesses = styled.ul`
    margin: 0;
    list-style: none;
    padding: 0;
`
