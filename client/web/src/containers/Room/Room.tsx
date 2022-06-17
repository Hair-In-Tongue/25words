import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { History } from 'history'
import { PlayerState } from '../../../../../api/types'
import { HathoraClient, HathoraConnection } from '../../../../.hathora/client'
import Game from '../Game/Game'
import { IUserData } from '../../interfaces/GlobalInterface'
import {
    BackgroundImage,
    Gradient,
} from '../../components/GameLayout/GameLayout.styled'
import { Color } from '../../../../../api/types'
import Loading from '../../components/Loading/Loading'
import { useTranslation } from 'react-i18next'

const client = new HathoraClient()

function Room() {
    const [playerState, setPlayerState] = useState<PlayerState | undefined>(
        undefined
    )
    const [hathora, setHathora] = useState<HathoraConnection | undefined>(
        undefined
    )
    const { t } = useTranslation()
    const [is404, setIs404] = useState<boolean>(false)
    const path = useLocation().pathname
    const history = useHistory()
    const [userData, setUserData] = useState<IUserData>({
        token: '',
        id: '',
        name: '',
    })

    useEffect(() => {
        if (hathora === undefined) {
            initRtag(
                path,
                history,
                setHathora,
                setPlayerState,
                setUserData
            ).catch((e) => {
                console.error('Error connecting', e)
                setIs404(true)
            })
        }
    }, [path])

    if (playerState && hathora && !is404 && path !== '/room') {
        return (
            <Game
                userData={userData}
                playerState={playerState}
                client={hathora}
            />
        )
    } else if (is404) {
        return (
            <div className="background">
                <span className="fourOhFour">{t('statusCodes.s404')}</span>
            </div>
        )
    } else {
        return (
            <>
                <Gradient currentTurn={Color.GRAY} />
                <BackgroundImage />
                <Loading />
            </>
        )
    }
}

async function initRtag(
    path: string,
    history: History,
    setHathora: (client: HathoraConnection) => void,
    onStateChange: (state: PlayerState) => void,
    setUserData: (userData: IUserData) => void
): Promise<void> {
    const storedUserData = sessionStorage.getItem('user')

    const token: string = storedUserData
        ? JSON.parse(storedUserData).token
        : await client.loginAnonymous().then((t) => {
              sessionStorage.setItem(
                  'user',
                  JSON.stringify({
                      token: t,
                  })
              )

              return t
          })
    const payload = parseJwt(token)
    setUserData({
        token: token,
        id: payload.id,
        name: payload.name,
    })

    if (path === '/room') {
        const stateId = await client.create(token, {})
        history.push(`/room/${stateId}`)
    } else {
        const stateId = location.pathname.split('/').pop()
            ? location.pathname.split('/').pop()
            : null
        if (stateId) {
            const connection = await client.connect(
                token,
                stateId,
                ({ state }) => onStateChange(state),
                console.error
            )
            setHathora(connection)
        }
    }
}

function parseJwt(token: string) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )

    return JSON.parse(jsonPayload)
}

export default Room
