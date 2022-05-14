import styled from 'styled-components'
import { ReactSVG } from 'react-svg'

export const LayoutHeader = styled.nav`
    display: flex;
    align-items: center;
    padding: 16px 22px;
    margin-bottom: 7px;
    width: 100%;
`

export const LayoutFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

export const HeaderIcon = styled(ReactSVG)`
    fill: ${({ theme: { colors } }) => colors.whiteColor};
`

export const HeaderButton = styled.button`
    padding: 0px 1px 1px 0px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: white;
    font-size: 24px;
    background-color: #3587d2;
    border: 2px solid #132178;
    box-shadow: -2px -4px 4px 0px #00000040 inset;
`

export const Timer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 48px;
    background-color: ${({ theme }) => theme.colors.elementBackground};
    font-size: 28px;
    border-radius: 16px;
    border: 3px solid black;
`
