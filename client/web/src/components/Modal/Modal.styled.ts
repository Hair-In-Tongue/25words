import styled from 'styled-components'

export const Container = styled.div`
    padding: 20px 30px;
    color: ${({ theme: { colors } }) => colors.modalText};
`
