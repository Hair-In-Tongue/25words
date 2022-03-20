import styled from 'styled-components'

export const TeamCard = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-rows: 15% 75% 10%;
    border-radius: 1rem;
    overflow: hidden;
    background-color: ${({ color }) => color || 'white'};
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
