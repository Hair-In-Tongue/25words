import styled from 'styled-components'

export const Container = styled.div<{ margin: string }>`
    margin: ${({ margin }) => margin};
    color: ${({ theme: { colors } }) => colors.modalText};
`
