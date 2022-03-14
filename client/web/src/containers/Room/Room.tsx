import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { History } from 'history'
import { PlayerState } from '../../../../../api/types'
import { HathoraClient, HathoraConnection } from '../../../../.hathora/client'

const client = new HathoraClient(import.meta.env.VITE_APP_ID as string)

function Room() {
    const [playerState, setPlayerState] = useState<PlayerState | undefined>(
        undefined
    )
    const [hathora, setHathora] = useState<HathoraConnection | undefined>(
        undefined
    )
    const [is404, setIs404] = useState<boolean>(false)
    const path = useLocation().pathname
    const history = useHistory()

    useEffect(() => {
        if (hathora === undefined) {
            initRtag(path, history, setHathora, setPlayerState).catch((e) => {
                console.error('Error connecting', e)
                setIs404(true)
            })
        }
    }, [path])

    console.log(playerState)

    if (playerState && hathora && !is404 && path !== '/room') {
        return <></>
    } else if (is404) {
        return (
            <div className="background">
                <span className="fourOhFour">
                    Game with this Game Code does not exist
                </span>
            </div>
        )
    } else {
        return <div></div>
    }
}

async function initRtag(
    path: string,
    history: History,
    setHathora: (client: HathoraConnection) => void,
    onStateChange: (state: PlayerState) => void
): Promise<void> {
    const storedUserData = sessionStorage.getItem('user')
    const token: string = storedUserData
        ? JSON.parse(storedUserData).token
        : await client.loginAnonymous().then((t) => {
              sessionStorage.setItem('user', JSON.stringify({ token: t }))
              return t
          })
    if (path === '/room') {
        const connection = await client.connectNew(
            token,
            ({ state }) => onStateChange(state),
            console.error
        )
        console.log(connection)

        setHathora(connection)
        history.replace(`/room/${connection.stateId}`)
    } else {
        const stateId = path.split('/').pop()
        const connection = client.connectExisting(
            token,
            stateId,
            ({ state }) => onStateChange(state),
            console.error
        )
        setHathora(connection)
    }
}

export default Room
