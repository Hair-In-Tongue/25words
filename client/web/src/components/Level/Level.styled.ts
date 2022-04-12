import styled from 'styled-components'

export const RadioLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 4px;
    border-radius: 8px;
    font-size: 18;
    border: 1px solid #453f38;
    width: 80px;
    height: 36px;
    background-color: #e3d5c5;
    box-shadow: inset -2px -4px 4px rgba(0, 0, 0, 0.25);
    cursor: 'pointer';
`

export const RadioButton = styled.input`
    display: none;

    &:checked + ${RadioLabel} {
        background-color: #c5b4a1;
        box-shadow: inset 2px 4px 4px rgba(0, 0, 0, 0.5);
    }
`
