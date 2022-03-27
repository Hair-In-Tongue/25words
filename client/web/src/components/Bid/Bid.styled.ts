import styled from 'styled-components'

export const BidContainer = styled.div<{ left: boolean }>`
    display: grid;
    grid-template-columns: ${({ left }) =>
        left ? `96px 32px;` : `32px 96px;`};
    grid-template-rows: 48px 32px;
    gap: 4px 0px;
    height: auto;
    grid-template-areas:
        ${({ left }) =>
        left ? `'i2 i1' 'i4 .';` : `'i1 i2' '. i4';`}
        'i2 i1'
        'i4 .';
`

export const ArrowContainer = styled.div`
    grid-area: i1;
    align-self: center;
`

export const ArrowUp = styled.button`
    border: none;
    background-color: unset;

    &:after {
        content: '🔼';
        display: inline-block;
        font-size: 16px;
    }
    &:hover:enabled {
        cursor: pointer;
    }
`

export const ArrowDown = styled.button`
    border: none;
    background-color: unset;

    &:after {
        content: '🔽';
        display: inline-block;
        font-size: 16px;
    }
    &:hover:enabled {
        cursor: pointer;
    }
`

export const BidValue = styled.div`
    grid-area: i2;
    background-color: lightblue;
    color: black;
    height: 48px;
    width: 96px;
    border-radius: 8px;
    text-align: center;
    line-height: 48px;
    font-size: 1.2rem;
`

export const ActionContainer = styled.div`
    grid-area: i4;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
`

export const ActionAccept = styled.button`
    place-self: center;
    height: 100%;
    width: 100%;
    padding: 4px;
    border-radius: 8px 0 0 8px;
    line-height: 24px;
    text-align: left;
    padding-left: 12px;
    border: none;
    background-color: none;
    border-right: 1px solid gray;
    background-color: lightblue;

    &:after {
        content: '✅';
        display: inline-block;
        font-size: 20px;
    }
    &:hover:enabled {
        background-color: darkblue;
        cursor: pointer;
    }
`

export const ActionRefuse = styled.button`
    background-color: lightblue;
    place-self: center;
    height: 100%;
    width: 100%;
    padding: 4px;
    border-radius: 0 8px 8px 0;
    line-height: 24px;
    text-align: right;
    padding-right: 12px;
    border: none;
    background-color: none;
    border-left: 1px solid gray;
    background-color: lightblue;

    &:after {
        content: '🏳️';
        display: inline-block;
        font-size: 20px;
    }
    &:hover:enabled {
        background-color: darkblue;
        cursor: pointer;
    }
`
