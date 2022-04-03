import styled from 'styled-components'

export const GridLayout = styled.div`
    display: grid;
    height: auto;
    &:nth-child(1) {
        justify-items: center;
    }
    @media ${({ theme }) => theme.devices.mobile} {
    }
    @media ${({ theme }) => theme.devices.tablet} {
    }
    @media ${({ theme }) => theme.devices.desktop} {
    }
`

export const GridUnit = styled.div`
    padding: 0;
`
