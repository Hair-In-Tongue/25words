import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

export const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.colors.menuButton};
    color: ${({ theme }) => theme.colors.menuButtonText};
    font-size: 24px;
    padding: 0 15px;
    border: 2px solid #000037;
    border-radius: 20px;
    box-shadow: inset -4px -4px 4px rgba(0, 0, 55, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    transition: 0.3s;

    &:hover {
        box-shadow: inset 0px 2px 60px rgba(255, 255, 255, 0.2);
        border: 2px solid ${({ theme }) => theme.colors.menuButtonLighten10};
    }
`

export const Close = styled(ReactSVG)`
    fill: ${({ theme }) => theme.colors.menuButtonText};
    width: 24px;
    margin-left: 10px;
`
