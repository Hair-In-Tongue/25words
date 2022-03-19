import React from 'react'
import GameLayout from '../../components/GameLayout/GameLayout'
import Lobby from '../../components/Lobby/Lobby'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { GameProvider } from '../../context/GameProvider'
import { GameStatus } from '../../../../../api/types'

const Game = ({ userData, playerState, client }: IGameProps) => {
    return (
        <GameProvider gameProps={{ userData, playerState, client }}>
            <GameLayout>
                {playerState.gameStatus === GameStatus.NOT_STARTED && (
                    <Lobby
                        userData={userData}
                        playerState={playerState}
                        client={client}
                    />
                )}
            </GameLayout>
        </GameProvider>
    )
}

export default Game
