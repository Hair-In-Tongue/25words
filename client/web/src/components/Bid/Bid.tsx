import React, { useState } from 'react'
import {
    BidContainer,
    ArrowContainer,
    Triangle,
    Arrow,
    ActionButton,
    ActionIcon,
} from './Bid.styled'
import { useGameContext } from '../../context/GameProvider'
import { IGameProps } from '../../interfaces/GlobalInterface'
import { iconList } from '../../assets'

const Bid = () => {
    const { client, playerState, userData }: IGameProps = useGameContext()
    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })

    const teamColor = playerDetails?.team
    const team = playerState.teams?.find((t) => t.color === teamColor)
    const disableButtons = !(playerState.roundInfo?.currentTurn === teamColor)

    const [bidValue, setBidValue] = useState<number>(team?.bid || 25)

    const sendBid = async () => {
        await client?.bid({
            hints: bidValue,
        })
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
                console.log(bidValue)
                return setBidValue(bidValue + 1)
            }
        }
        return null
    }

    const downBid = () => {
        if (bidValue !== undefined && bidValue > 5) {
            console.log(bidValue)
            return setBidValue(bidValue - 1)
        }
        return null
    }

    return (
        <>
            <BidContainer>
                <ActionButton
                    left={true}
                    disabled={disableButtons}
                    onClick={sendBid}
                >
                    <ActionIcon src={iconList.auction}></ActionIcon>
                </ActionButton>
                <ArrowContainer>
                    <Arrow disabled={disableButtons} onClick={upBid}>
                        <Triangle
                            direction={'up'}
                            src={iconList.triangle}
                        ></Triangle>
                    </Arrow>
                    <Arrow disabled={disableButtons} onClick={downBid}>
                        <Triangle
                            direction={'down'}
                            src={iconList.triangle}
                        ></Triangle>
                    </Arrow>
                </ArrowContainer>
                <ActionButton left={false} disabled={disableButtons}>
                    <ActionIcon src={iconList.flag}></ActionIcon>
                </ActionButton>
            </BidContainer>
        </>
    )
}

export default Bid
