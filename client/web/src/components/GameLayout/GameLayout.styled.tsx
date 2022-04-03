import styled from 'styled-components'
import { Color } from '../../../../../api/types'

export const LayoutContainer = styled.div<{ currentTurn: Color | undefined }>`
    min-height: 100vh;
    background-color: ${({ currentTurn, theme }) => {
        if (currentTurn === Color.BLUE) {
            return theme.colors.blueTurnBackground
        } else if (currentTurn === Color.RED) {
            return theme.colors.redTurnBackground
        } else {
            return theme.colors.background
        }
    }};
`

export const LayoutBody = styled.div`
    margin: 0;
`
