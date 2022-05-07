import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

export const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.colors.menuButton};
    color: ${({ theme }) => theme.colors.menuButtonText};
    font-size: 24px;
    padding: 6px 10px;
    border: 2px solid #000037;
    border-radius: 20px;
    box-shadow: inset -4px -4px 4px rgba(0, 0, 55, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
`

export const Close = styled(ReactSVG)`
    fill: ${({ theme }) => theme.colors.menuButtonText};
    width: 24px;
    margin-left: 10px;
`
