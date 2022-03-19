import styled from 'styled-components'

export const LayoutContainer = styled.div`
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.background};
`

export const LayoutBody = styled.div`
    margin: 50px 0;
`
