import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

export const Form = styled.form`
    padding: 20px 0;
    margin: 0;
    display: flex;
`

export const Icon = styled(ReactSVG)`
    path {
        fill: ${({ theme: { colors } }) => colors.whiteColor};
    }
`

export const Input = styled.input`
    width: 260px;
    height: 42px;
    margin: 0;
    outline: none;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    border: 2px solid black;
    border-radius: 16px 0px 0px 16px;
    &::placeholder {
        color: black;
    }
`

export const SubmitButton = styled.button`
    width: 54px;
    height: 42px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-radius: 0px 30px 30px 0px;
    border: 2px solid black;
    border-left: none;
    outline: none;
    background-color: ${({ theme: { colors } }) => colors.menuButton};
`
