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

const Bid = ({ bid }: IBid) => {
    const { client, playerState }: IGameProps = useGameContext()

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
            <BidContainer>
                <ArrowContainer>
                    <ArrowUp onClick={upBid} />
                    <ArrowDown onClick={downBid} />
                </ArrowContainer>
                <BidValue>{bidValue}</BidValue>
                <ActionContainer>
                    <ActionAccept
                        onClick={() =>
                            bidValue !== undefined ? sendBid(bidValue) : null
                        }
                    />
                    <ActionRefuse onClick={() => sendBid(0)} />
                </ActionContainer>
            </BidContainer>
        </>
    )
}

export default Bid
