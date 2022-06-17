import styled, { css } from 'styled-components'
import { ReactSVG } from 'react-svg'
import Select from 'react-select'
import { imageList } from '../../../assets'

export const Icon = styled(ReactSVG)`
    path {
        fill: ${({ theme: { colors } }) => colors.modalText};
    }
`

const ActionButton = styled.button`
    outline: none;
    border: none;
    padding: 0;
    background: transparent;
    &:disabled {
        /* ${Icon} {
            path {
                fill: lightgray;
            }
        } */
        filter: grayscale(100%) brightness(50);
    }
`

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`

export const Teams = styled(FlexColumn)`
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    padding: 15px 10px;
`

export const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 296px;
`

export const Flex = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

export const Settings = styled(FlexColumn)`
    align-items: center;
    margin-bottom: 20px;
`

export const Line = styled.div`
    width: 90%;
    height: 4px;
    background-color: white;
    border-radius: 2px;
`

export const Button = styled.button`
    margin: 10px 0px;
    width: 230px;
    height: 37px;
    border-radius: 18.5px;
    border: 2px solid #bf5f26;
    background-color: #e6a758;
    color: black;
    box-shadow: inset -4px -4px 4px rgba(0, 0, 55, 0.3);
    outline: none;
    &:disabled {
        background-color: lightgray;
        border-color: rgb(200, 200, 200);
    }
`

export const DecksContainer = styled(FlexColumn)`
    align-items: center;
    width: 313px;
    height: 197px;
    margin-bottom: 5px;
`

export const Form = styled.form`
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    margin: 0;
    background-color: ${({ theme: { colors } }) => colors.whiteColor};
    border: 2px solid #000037;
    border-bottom: none;
    border-radius: 16px 16px 0px 0px;
    width: 288px;
    height: 80px;
    overflow: hidden;
`

export const Title = styled.h2`
    background-color: ${({ theme: { colors } }) => colors.grayBackground};
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    height: 26px;
`

export const Input = styled.input`
    width: 241px;
    height: 50px;
    margin: 0;
    outline: none;
    border: none;
    font-size: 32px;
    text-align: center;
`

export const AddButton = styled(ActionButton)`
    margin: 0px 5px 0px 0px;
    width: 42px;
    height: 42px;
`

export const RemoveButton = styled(ActionButton)`
    width: 40px;
    height: 40px;
`

export const DecksList = styled.ul`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 5px;
    width: 313px;
    height: 117px;
    list-style: none;
    padding: 0px;
    margin: 0px;
    margin: 0px;
    background: linear-gradient(
            0deg,
            rgba(229, 229, 229, 0.5),
            rgba(229, 229, 229, 0.5)
        ),
        #ffffff;
    border: 1px solid #000037;
    box-shadow: inset -4px -4px 4px rgba(0, 0, 55, 0.3);
    border-radius: 10px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const ListItem = styled.li`
    margin: 5px 0;
    display: flex;
    align-items: center;
    width: 303px;
    height: 58px;
`

export const DeckInfo = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    margin: 0;
    padding: 2px 4px;
    width: 258px;
    height: 52px;
    background-color: white;
    border: 1px solid #000037;
    border-radius: 16px;
    font-size: 18px;
    font-weight: 500;
    p {
        width: 100%;
        text-align: center;
        margin: 0;
        overflow-wrap: break-word;
    }
`

export const LanguageSelector = styled.div`
    width: 196px;
    height: 36px;
    background: #ffffff;
    border: 2px solid #000037;
    border-radius: 30px;
`

export const StyledSelect = styled(Select)`
    width: 200px;
    height: 40px;
    .Select__control {
        transition-duration: 0.3s;
        box-sizing: border-box;
        margin-top: 5px;
        width: 196px;
        height: 36px;
        background: #ffffff;
        border: 2px solid #000037;
        border-radius: 30px;
    }

    .Select__control:hover {
        border: 2px solid #000037;
    }

    .Select__control--menu-is-open {
        .Select__control {
            background: lightgray;
        }

        .Select__value-container {
            filter: saturate(50%);
        }
    }

    .Select__value-container {
        display: flex;
        justify-content: left;
        padding: 0;
        color: black;
        font-size: 20px;
        font-weight: 500;
        img {
            margin-right: 5px;
        }
    }

    .Select__indicators {
        display: none;
    }
    .Select__menu {
        margin: 1px 0 0 0;
        width: 196px;
        background: none;
        outline: none;
        border: none;
        box-shadow: none;
    }
    .Select__option {
        box-sizing: border-box;
        margin-top: 5px;
        width: 186px;
        height: 36px;
        border: 2px solid #000037;
        border-radius: 30px;
        display: flex;
        justify-content: left;
        padding: 0;
        margin: 0 0 1px 0;
        color: black;
        font-size: 20px;
        font-weight: 500;
        align-items: center;
        overflow: hidden;
        background-color: ${({ theme: { colors } }) => colors.whiteColor};
    }
    .Select__option:hover {
        background-color: ${({ theme: { colors } }) => colors.grayBackground};
    }
`

export const IconContainer = styled.div<{ language: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #000037;
    transform: translateX(-2px);
    margin: 0;
    margin-right: 5px;
    width: 34px;
    height: 34px;
    border-radius: 18px;
    background-color: red;
    overflow: hidden;
    background: ${({ language }) =>
        `url( ${imageList[language as keyof typeof imageList]})`};
    background-size: cover;
    background-position: center;
`
