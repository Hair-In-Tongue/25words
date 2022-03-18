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

export const TeamCard = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-rows: 15% 75% 10%;
    margin: 1.5rem 5px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${(props: Props) => props.color || 'white'};
    width: 15vw;
    height: 300px;
`

export const Score = styled.h2`
    margin: 0px;
    text-align: center;
`

export const PlayersList = styled.ul`
    width: 100%;
    height: 100%;
    margin: 0;
    list-style-type: none;
    list-style: none;
    padding: 10px 0px;
    text-align: center;

    li {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 5px;
        background-color: rgba(0, 0, 0, 0.1);
        &:not(:last-child) {
            margin-bottom: 2px;
        }
    }
`

export const CrownIcon = styled.img`
    margin: 0px 10px;
    height: 1.2rem;
`

export const JoinTeamBtn = styled.button`
    outline: none;
    border: none;
    transition-duration: 0.3s;
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    &:hover {
        box-shadow: inset 0px 2px 60px rgba(255, 255, 255, 0.5);
        cursor: pointer;
    }
`

export const ProgressBar = styled.div`
    width: 5%;
    height: 20px;
    background-color: red;
    margin-top: 20px;
    animation: ${progress} 0.7s ease-in-out infinite;
`
