import styled, { css } from 'styled-components'
import { ReactSVG } from 'react-svg'

export const Details = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1.5rem;
    overflow: hidden;
    background-color: ${({ color }) => color || 'white'};
    color: white;
    width: 15rem;
    z-index: 1;
    
    ${({ theme: { devices } }) => css`
        ${devices.mobile} {
            width: 200px;
            height: 256px;
        }
        
        ${devices.tablet} {
        }
        
        ${devices.desktop} {
        }
    `}
`

export const Leader = styled.h2`
    margin: 18px 0px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    
    &::after {
        content: '';
        display: block;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 2px;
        position: absolute;
        top: 60px;
        width: 96px;
        height: 4px;
        pointer-events: none;
    }
`

export const Score = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    margin: 0px;
    background-color: ${({ color }) => color || 'white'};
    color: white;
    z-index: 2;
`

export const TeamCard = styled.div<{ left: boolean }>`
    display: flex;
    flex-direction: ${({ left }) => (left ? 'row' : 'row-reverse')};
    position: fixed;
    width: 264px;
    height: 256px;
    
    ${Details} {
        border-radius: ${({ left }) => left ? '0px 0px 16px 0px' : '0px 0px 0px 16px'};
    }
    
    ${Leader} {
        &::after {
            left: ${({ left }) => (left ? '52px' : '116px')};
        }
    }
    
    ${Score} {
        border-radius: ${({ left }) => left ? '0px 16px 16px 0px' : '16px 0px 0px 16px'};
        transform: ${({ left }) => left ? 'translateX(-1px)' : 'translateX(1px)'}
    }
    
    ${({ theme: { devices }, left }) => css`          
        ${devices.mobile} {
            ${(left ? 'left: -186' : 'right: -186')};
        }
        
        ${devices.tablet} {
            ${(left ? 'left: 0' : 'right: 0')};
        }
        
        ${devices.desktop} {
        }
    `}
    
`

export const Players = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: -2px -4px 4px 0px #00000040 inset;
    border-radius: 16px;
    ${({ theme: { devices } }) => css`
        ${devices.mobile} {
            width: 144px;
            height: 190px;
        }
        
        ${devices.tablet} {
        }
        
        ${devices.desktop} {
        }
    `}
`

export const Circle = styled.div`
    padding-top: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 28px;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: inset -2px -4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    width: 48px;
    height: 48px;
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
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        padding: 0 5px;
        
        &:not(:last-child) {
            margin-bottom: 2px;
        }
    }
`

export const CrownIcon = styled(ReactSVG)`
    margin: 0px 10px;
    height: 1.2rem;
    width: 1.2rem;
`

export const JoinTeamBtn = styled.button`
    padding-top: 4px;
    margin-bottom: 2px;
    outline: none;
    border: none;
    transition-duration: 0.3s;
    box-shadow: -2px -4px 4px 0px #00000040 inset;
    color: white;
    font-weight: 700;
    font-size: 20px;
    width: 144px;
    height: 33px;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.3);
    ${({ theme: { devices } }) => css`
        ${devices.mobile} {
            width: 144px;
            height: 32px;
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
