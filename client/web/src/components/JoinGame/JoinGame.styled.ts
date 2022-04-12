import styled from 'styled-components'
import { HeaderButton } from '../GameLayout/Header/Header.styled'

export const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    &:nth-child(2) {
        justify-content: space-around;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    padding: 3px;
    border: 2px solid #453f38;
    background-color: white;
    border-radius: 16px;
    width: 268px;
    height: 342px;
`

export const Header = styled.div`
    text-align: center;
    margin: 0;
    color: #0f1a60;
    font-weight: 700;
    &:nth-child(1) {
        font-size: 112px;
        height: 102px;
    }
    &:nth-child(2) {
        font-size: 62px;
    }
    &:nth-child(3) {
        line-height: 38px;
        font-size: 20px;
        color: #453f38;
    }
`

export const HeaderContainer = styled.div`
    margin-bottom: 0.5rem;
`
export const JoinButton = styled.button`
    background-color: #0f1a60;
    color: #f9f6f3;
    width: 244px;
    height: 42px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding-top: 6px;
    outline: none;
    border: none;
    border-radius: 16px;
`
export const Spacing = styled.div`
    margin-bottom: 10px;
`

export const Text = styled.div`
    width: 100%;
    text-align: center;
`

export const Input = styled.input`
    width: 244px;
    height: 42px;
    padding-top: 6px;
    padding-left: 14px;
    border-radius: 16px;
    border: 2px solid #000037;
    outline: none;
    font-weight: 400;
    font-size: 24px;
    &::placeholder {
        color: black;
    }
`
