import styled from 'styled-components'

export const LayoutHeader = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 16px 22px;
    margin-bottom: 7px;
    min-width: 100%;
    //background-color: ${({ theme }) => theme.colors.header};
`

export const LayoutFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
`

export const HeaderButton = styled.button`
    padding-top: 4px;
    width: 48px;
    height: 48px;
    background-color: black;
    border-radius: 50%;
    color: white;
    font-size: 24px;
    background-color: #3587d2;
    border: 2px solid #132178;
    box-shadow: -2px -4px 4px 0px #00000040 inset;
`

export const Timer = styled.div`
    padding-top: 4px;
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
