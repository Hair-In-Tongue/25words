import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.2);
    }
`

export const Loader = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
`

export const LoadingCard = styled.div<{ index: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.25rem;
    width: 2rem;
    height: 3.2rem;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    animation: ${loadingAnimation} 0.6s cubic-bezier(1, 0.5, 0.5, 0) infinite;
    animation-delay: ${({ index }) => index / 10}s;
`
