import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

export const BidContainer = styled.div`
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 284px;
    height: 129px;
`

export const ArrowContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const Triangle = styled(ReactSVG)<{ direction: string }>`
    padding: 0;
    ${({ direction }) =>
        direction === 'down' ? 'transform: rotate(180deg)' : ''};
    path {
        ${({ theme: { colors } }) =>
            `fill: ${colors.blueBackground};
             stroke: ${colors.blueOutline}`};
        stroke-width: 2px;
        transition: 0.5s;
    }

    &:hover {
        path {
            fill: #2b79c1;
        }
    }

    &:active {
        path {
            fill: #266cac;
            stroke: #192ca5;
        }
    }
`

export const Arrow = styled.button`
    padding: 8px 0;
    border: none;
    background: transparent;
    &:disabled {
        ${Triangle} {
            path {
                fill: lightgray;
                stroke: rgba(0, 0, 0, 0.5);
            }
        }
    }
`

export const ActionIcon = styled(ReactSVG)`
    padding: 0;
    path {
        fill: ${({ theme: { colors } }) => colors.whiteColor};
        width: auto;
    }
`

export const ActionButton = styled.button<{ left: boolean }>`
    outline: none;
    border: none;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background-color: ${({ theme: { colors }, left }) =>
        left ? colors.blueTeam : colors.redTeam};
    border: ${({ theme: { colors }, left }) =>
        left
            ? `2px solid ${colors.blueTeamDark}`
            : `2px solid ${colors.redTeamDark}`};
    box-shadow: inset -2px -4px 4px rgba(0, 0, 0, 0.25);
    transition: 0.5s;

    &:disabled {
        background-color: lightgray;
        border: 2px solid rgba(0, 0, 0, 0.5);
    }

    ${ActionIcon} {
        ${({ left }) => (left ? 'transform: scaleX(-1)' : '')}
    }

    &:hover {
        background-color: ${({ theme: { colors }, left }) =>
            left ? colors.blueTeamDarken10 : colors.redTeamDarken10};
    }

    &:active {
        background-color: ${({ theme: { colors }, left }) =>
            left ? colors.blueTeamDarken20 : colors.redTeamDarken20};
    }
`
