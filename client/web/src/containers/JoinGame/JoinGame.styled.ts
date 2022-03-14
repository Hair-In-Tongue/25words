import styled from 'styled-components'
import theme from '../../theme'

export const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`
export const Container = styled.div`
    padding: 1.5rem 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 10px 10px 20px 2px ${theme.colors.shadow};
`

export const Header = styled.div`
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
`

export const HeaderContainer = styled.div`
    margin-bottom: 0.5rem;
`
export const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
`
export const JoinButton = styled.button`
    background-color: ${theme.colors.button};
    color: ${theme.colors.text};
    width: 100%;
    outline: none;
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
    font-weight: 500;
    &:active {
        background-color: ${theme.colors.buttonClick};
    }
`
export const Spacing = styled.div`
    margin-bottom: 10px;
`

export const Text = styled.div`
    width: 100%;
    text-align: center;
`

export const Input = styled.input`
    width: 100%;
    text-align: center;
    outline: none;
    padding: 0.5rem 0;
    font-weight: 500;
`
