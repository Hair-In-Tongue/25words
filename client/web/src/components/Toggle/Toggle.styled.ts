import styled from 'styled-components'

export const ToggleButton = styled.button<{ on: boolean }>`
    width: 44px;
    height: 24px;
    position: relative;
    cursor: pointer;
    border-radius: 25px;
    outline: none;
    background-color: ${({ on }) => (on ? '#c5b4a1' : '#948779')};
    border: 2px solid #ededed;
    box-shadow: ${({ on }) =>
        on
            ? 'inset -2px -4px 4px rgba(0, 0, 0, 0.5)'
            : 'inset 2px 4px 4px rgba(0, 0, 0, 0.5)'};
    transition: all 0.2s ease-in;

    &::after {
        content: '';
        position: absolute;
        top: 0px;
        width: 18px;
        height: 18px;
        border: 1px solid #423d36;
        box-shadow: inset -2px -4px 4px rgba(0, 0, 0, 0.25);
        will-change: transform;
        transform: translate(${({ on }) => (on ? 1 : -20)}px);
        transition: all 0.2s ease-out;
        background: #fdf3d8;
        outline: none;
        border-radius: 50%;
    }
`

export const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
