import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`

export const Form = styled.form`
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
    line-height: 42px;
    margin: 0;
    padding: 0 9px;
    outline: none;
    font-size: 24px;
    font-weight: 400;
    border: 2px solid ${({ theme: { colors } }) => colors.cardOutline};
    border-radius: 16px 0px 0px 16px;
    &::placeholder {
        color: black;
    }
`

export const SubmitButton = styled.button`
    width: 54px;
    height: 42px;
    margin: 0;
    overflow: hidden;
    border-radius: 0px 30px 30px 0px;
    outline: none;
    border: none;
    background-color: ${({ theme: { colors } }) => colors.cardOutline};
`
