import React from 'react'
import { Color } from '../../../../../api/types'
import { ILobbyProps } from '../../interfaces/Interface'

const Lobby = (props: ILobbyProps) => {
    const players = props.playerState.players
    const noTeam = players.filter((player) => player.team === Color.GRAY)
    const redTeam = players.filter((player) => player.team === Color.RED)
    const blueTeam = players.filter((player) => player.team === Color.BLUE)

    return (
        <>
            {props.playerState.players.find(
                (player) => player.id === props.userData.id
            ) ? (
                <>
                    <div>
                        <h1>RED TEAM</h1>
                        {redTeam.map((player) => (
                            <div key={player.id}>{player.id}</div>
                        ))}
                    </div>
                    <div>
                        <h1>BLUE TEAM</h1>
                        {blueTeam.map((player) => (
                            <div key={player.id}>{player.id}</div>
                        ))}
                    </div>
                    <div>
                        <h1>NO TEAM</h1>
                        {noTeam.map((player) => (
                            <div key={player.id}>{player.id}</div>
                        ))}
                    </div>
                </>
            ) : (
                <button onClick={async () => await props.client.joinGame()}>
                    JOIN GAME
                </button>
            )}
        </>
    )
}

export default Lobby
