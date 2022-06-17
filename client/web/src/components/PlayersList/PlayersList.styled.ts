import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

export const TeamName = styled.h2`
    margin: 0 2px;
`

export const List = styled.ul`
    list-style: none;
    padding-left: 0;
    overflow: auto;
    align-self: stretch;
    height: 100%;

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

export const TeamColor = styled.div`
    display: inline-block;
    width: 17px;
    height: 34px;
    margin-right: 10px;
`

export const KickButton = styled.button`
    position: relative;
    width: 34px;
    height: 34px;
    padding: 0;
    outline: none;
    border: none;
`

export const Icon = styled(ReactSVG)`
    path {
        fill: white;
    }
`

export const ListItem = styled.li<{ color: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 34px;
    color: black;
    background-color: white;
    border: 1px solid ${({ color }) => color};
    border-radius: 17px;
    margin-bottom: 3px;
    overflow: hidden;

    ${TeamColor} {
        background-color: ${({ color }) => color};
    }
    ${KickButton} {
        border-left: 1px solid ${({ color }) => color};
        background-color: ${({ color }) => color};
    }
`

export const PlayerInfo = styled.div`
    display: flex;
    align-items: center;
`
