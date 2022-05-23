import React from 'react'
import { IButtonProps } from '../../interfaces/ButtonInterface'
import { StyledButton, Close } from './ButtonStyled'
import { iconList } from '../../assets'

const Button = ({ text, onClick }: IButtonProps) => {
    return (
        <StyledButton onClick={onClick}>
            {text}
            <Close src={iconList.logout} />
        </StyledButton>
    )
}
export default Button
