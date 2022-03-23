import React, { useState } from 'react'
import {
    BidContainer,
    BidValue,
    ArrowContainer,
    ArrowUp,
    ArrowDown,
    ActionContainer,
    ActionAccept,
    ActionRefuse,
} from './Bid.styled'
import { IBid } from '../../interfaces/BidInterface'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { Color } from '../../../../../api/types'

const Bid = ({ bid, teamColor }: IBid) => {
    const { client, playerState, userData }: IGameProps = useGameContext()
    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })
    const left = teamColor === Color.RED
    const disableButtons = playerState.roundInfo?.currentTurn === teamColor

    const [bidValue, setBidValue] = useState<number | undefined>(bid)

    const sendBid = async (number: number) => {
        const dupa = await client?.bid({
            hints: number,
        })
        console.log(dupa)
    }

    const upBid = () => {
        if (
            playerState.teams !== undefined &&
            playerState.teams[0].bid !== undefined &&
            playerState.teams[1].bid !== undefined
        ) {
            const maxBid =
                playerState.teams[0].bid < playerState.teams[1].bid
                    ? playerState.teams[0].bid
                    : playerState.teams[1].bid
            if (bidValue !== undefined && bidValue < maxBid) {
                return setBidValue(bidValue + 1)
            }
        }
        return null
    }

    const downBid = () => {
        if (bidValue !== undefined && bidValue > 5) {
            return setBidValue(bidValue - 1)
        }
        return null
    }

    return (
        <>
            <BidContainer left={!left}>
                {playerDetails?.isGivingClues &&
                    playerDetails.team === teamColor && (
                        <>
                            <ArrowContainer>
                                <ArrowUp
                                    onClick={upBid}
                                    disabled={disableButtons}
                                />
                                <ArrowDown
                                    onClick={downBid}
                                    disabled={disableButtons}
                                />
                            </ArrowContainer>
                            <ActionContainer>
                                <ActionAccept
                                    onClick={() =>
                                        bidValue !== undefined
                                            ? sendBid(bidValue)
                                            : null
                                    }
                                    disabled={disableButtons}
                                />
                                <ActionRefuse
                                    onClick={() => sendBid(0)}
                                    disabled={disableButtons}
                                />
                            </ActionContainer>
                        </>
                    )}
                <BidValue>{bidValue}</BidValue>
            </BidContainer>
        </>
    )
}

export default Bid
