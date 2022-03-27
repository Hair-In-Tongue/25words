import styled from 'styled-components'

export const LayoutHeader = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0.75rem;
    min-width: 100%;
    background-color: ${({ theme }) => theme.colors.header};
`

export const LayoutFlex = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
`
