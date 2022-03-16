import styled from 'styled-components'
import { Props } from '../../interfaces/Interface'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const Teams = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`

export const Score = styled.h2`
    text-align: center;
`

export const TeamCard = styled.div`
    display: grid;
    grid-template-rows: 15% 75% 10%;
    margin: 0 10px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${(props: Props) => props.color || 'white'};
    width: 15%;
    height: 300px;
`

export const PlayersList = styled.ul`
    list-style-type: none;
    list-style: none;
    padding: 0;
    text-align: center;
`

export const PlayerItem = styled.li`
    padding: 0 5px;
    background-color: rgba(0, 0, 0, 0.1);
    &:not(:last-child) {
        margin-bottom: 2px;
    }
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
