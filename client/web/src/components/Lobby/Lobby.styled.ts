import styled, { keyframes } from 'styled-components'
import { Props } from '../../interfaces/Interface'

const progress = keyframes`
    0% {
        width: 5%;
    }

    50% {
        width: 30%;
    }
`

export const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 10px 10px 20px 2px black;
`

export const Teams = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`


export const ProgressBar = styled.div`
    width: 5%;
    height: 20px;
    background-color: red;
    margin-top: 20px;
    animation: ${progress} 0.7s ease-in-out infinite;
`
