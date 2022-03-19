import React from 'react'
import Header from './Header/Header'
import { LayoutBody, LayoutContainer } from './GameLayout.styled'

const GameLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <LayoutContainer>
            <Header />
            <LayoutBody>{children}</LayoutBody>
        </LayoutContainer>
    )
}

export default GameLayout
