import styled from 'styled-components'
import { InfoBoardProps } from '../../interfaces/InfoBoardInterface'

export const Container = styled.div`
    display: flex;
    padding: 0;
    width: 140px;
    height: 64px;
`

export const Team = styled.div<InfoBoardProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 4px;
    align-items: center;
    color: ${({ theme }) => theme.colors.whiteColor};
    height: 100%;
    width: 50%;
    border-radius: ${({ left }) => (left ? '16px 0 0 16px' : '0 16px 16px 0')};
    background-color: ${({ theme: { colors }, color }) =>
        colors[color as keyof typeof colors]};
    border: 2px solid
        ${({ theme: { colors }, color }) =>
            colors[(color + 'Dark') as keyof typeof colors]};
`

export const Header = styled.div`
    font-size: 14px;
`

export const Number = styled.div`
    font-size: 30px;
`
