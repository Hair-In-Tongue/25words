import styled from 'styled-components'
import { ReactSVG } from 'react-svg'
import { IRoundInfoProps } from '../../interfaces/RoundInfoInterface'

export const Container = styled.div`
    padding: 0;
    width: 150px;
`

export const HintsContainer = styled.div`
    display: flex;
`

export const HintsLeft = styled.div<IRoundInfoProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
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
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
`

export const Number = styled.div`
    font-size: 30px;
`
export const StyledSvg = styled(ReactSVG)`
    width: 30px;
    height: 30px;
    fill: white;
`
