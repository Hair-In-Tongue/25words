import styled from 'styled-components'

export const CardsColumn = styled.div`
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.25rem;
    padding: 1rem 1rem;
`

export const PlayingCard = styled.div<{ guessed: boolean }>`
    display: grid;
    justify-items: center;
    grid-template-rows: auto auto 6rem;
    row-gap: 1px;
    width: 8rem;
    border-radius: 5px;
    padding: 1rem 1rem;
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
