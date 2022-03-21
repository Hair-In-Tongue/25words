import styled, { keyframes } from 'styled-components'

const loadingAnimation = keyframes`
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.2);
    }
`

interface ILoadingProps {
    index: number
}

export const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100px;
`

export const LoadingCard = styled.div`
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
    animation-delay: ${(props: ILoadingProps) => props.index / 10}s;
`
