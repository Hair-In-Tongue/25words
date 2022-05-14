import React from 'react'
import { ToggleButton, Center } from './Toggle.styled'
import { IToggleProps } from '../../interfaces/ToggleInterface'

const Toggle = ({ on, onClick }: IToggleProps) => (
    <Center onClick={onClick}>
        <ToggleButton on={on} />
    </Center>
)

export default Toggle
