import styled, { css } from 'styled-components'

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

        ${devices.tablet} {
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
    color: black;
    margin-top: 12px;
`
