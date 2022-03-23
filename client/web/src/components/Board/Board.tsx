import React from 'react'
import { Container, FirstRow } from './Board.styled'
import Cards from '../Cards/Cards'
import Bid from '../Bid/Bid'
import { Color } from '../../../../../api/types'

const Board = () => {
    return (
        <Container>
            <FirstRow>
                <Bid teamColor={Color.RED} />
                <div>Timer</div>
                <Bid teamColor={Color.BLUE} />
            </FirstRow>

            <Cards />
        </Container>
    )
}

export default Board
