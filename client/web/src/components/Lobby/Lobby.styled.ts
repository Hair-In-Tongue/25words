import styled, { css, keyframes } from 'styled-components'

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 75px;
    padding: 10px;
    width: 268px;
    background-color: #f9f6f3;
    border: 2px solid #453f38;
    box-sizing: border-box;
    border-radius: 16px;
`

export const Teams = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const JoinTeamBtn = styled.button`
    outline: none;
    border: none;
    transition-duration: 0.3s;
    box-shadow: -2px -4px 4px 0px #00000040 inset;
    color: #f9f6f3;
    font-weight: 400;
    font-size: 24px;
    width: 112px;
    border-radius: 16px;
    background-color: ${({ color }) => color};

    ${({ theme: { devices } }) => css`
        ${devices.mobile} {
            &:active {
                box-shadow: inset 0px 2px 60px rgba(255, 255, 255, 0.5);
            }
        }

        ${devices.desktop} {
            &:hover:enabled {
                box-shadow: inset 0px 2px 60px rgba(255, 255, 255, 0.5);
                cursor: pointer;
            }
        }
    `}
`

export const JoinSpectator = styled(JoinTeamBtn)`
    width: 100%;
    background-color: ${({ color }) => color};
    color: black;
    margin-top: 12px;
`

export const Divider = styled.div`
    width: 186px;
    height: 2px;
    background-color: #523037;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const Settings = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const DifficultyContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const TimeSettings = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
`

export const GuessingTime = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 5px;
    font-size: 12px;
    font-weight: bold;
`

export const Time = styled.input`
    padding: 4px 0px 0px 0px;
    outline: none;
    border: 1px solid black;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    width: 80px;
    height: 36px;
    border-radius: 8px;
    background-color: #e3d5c5;
    color: black;
`

export const StartButton = styled(JoinTeamBtn)`
    width: 100%;
    line-height: 36px;
    background-color: #0f1a60;
    box-shadow: inset -2px -4px 4px rgba(0, 0, 0, 0.25);
    outline: none;
    border: none;
    border-radius: 16px;
    font-size: 24px;
    color: #f9f6f3;
    margin-top: 22px;
    margin-bottom: 5px;
`

export const ProgressBar = styled.div`
    width: 5%;
    height: 20px;
    background-color: red;
    margin-top: 20px;
    animation: ${progress} 0.7s ease-in-out infinite;
`

export const Button = styled(JoinTeamBtn)`
    font-size: 18px;
    font-weight: 400;
    font-style: normal;
    background-color: ${({ color }) => color};
    padding: 4px 6px;
`
