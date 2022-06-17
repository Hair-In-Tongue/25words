import styled from 'styled-components'
import { Color } from '../../../../../api/types'
import { imageList } from '../../assets'

export const LayoutContainer = styled.div`
    min-height: 100vh;
`

export const LayoutBody = styled.div`
    margin: 0;
`

const Absolute = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

export const Gradient = styled(Absolute)<{ currentTurn: Color | undefined }>`
    background: ${({ currentTurn, theme }) => {
        if (currentTurn === Color.BLUE) {
            return theme.colors.blueTurnBackground
        } else if (currentTurn === Color.RED) {
            return theme.colors.redTurnBackground
        } else {
            return theme.colors.background
        }
    }};
    z-index: -1;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.5s;
`

export const BackgroundImage = styled(Absolute)`
    z-index: -1;
    mix-blend-mode: overlay;
    background: url(${imageList.background});
    background-size: cover;
`
