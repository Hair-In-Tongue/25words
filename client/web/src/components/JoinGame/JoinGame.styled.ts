import styled from 'styled-components'

export const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Card = styled(FlexCol)`
    justify-content: space-around;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 10px;
    border: 2px solid #453f38;
    background-color: white;
    border-radius: 16px;
    width: 268px;
`

export const Header = styled.div`
    text-align: center;
    color: #0f1a60;
    font-weight: 700;
    &:nth-child(1) {
        font-size: 112px;
        line-height: 112px;
    }
    &:nth-child(2) {
        font-size: 62px;
        line-height: 62px;
    }
    &:nth-child(3) {
        margin-top: 12px;
        line-height: 25px;
        font-size: 20px;
        color: #453f38;
    }
`

export const HeaderContainer = styled.div`
    margin-bottom: 24px;
`
export const JoinButton = styled.button`
    background-color: #0f1a60;
    color: #f9f6f3;
    width: 244px;
    line-height: 40px;
    margin-top: 8px;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.025em;
    outline: none;
    border: none;
    border-radius: 16px;
    transition: 0.3s;

    &:hover:enabled {
        box-shadow: inset 0px 2px 60px rgba(255, 255, 255, 0.5);
        cursor: pointer;
    }
`
export const Spacing = styled.div`
    margin-bottom: 10px;
`

export const Text = styled.div`
    width: 100%;
    text-align: center;
`

export const Input = styled.input`
    width: 244px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 16px;
    padding: 5px 5px 8px;
    border: 2px solid #000037;
    outline: none;
    font-weight: 400;
    font-size: 24px;
    &::placeholder {
        color: black;
    }
`
