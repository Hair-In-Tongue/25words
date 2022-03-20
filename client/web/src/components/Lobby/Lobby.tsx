import React from 'react'
import { Container, Center } from './Lobby.styled'

import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'

const Lobby = () => {
    const { client }: IGameProps = useGameContext()

    const startGame = async () => {
        await client?.startGame({})
    }

    return (
        <Center>
            <Container>
                <button onClick={startGame}>Start Game</button>
            </Container>
        </Center>
    )
}

export default Lobby
