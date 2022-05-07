import React, { useState } from 'react'
import { GameStatus } from '../../../../../../api/types'
import { useGameContext } from '../../../context/GameProvider'
import {
    LayoutFlex,
    LayoutHeader,
    HeaderIcon,
    HeaderButton,
    Timer,
} from './Header.styled'
import { IGameProps } from '../../../interfaces/GlobalInterface'
import { iconList } from '../../../assets'
import Modal from '../../Modal/Modal'
import InstructionModal from '../../Modal/InstructionModal/InstructionModal'

const Header = () => {
    const { playerState, userData }: IGameProps = useGameContext()
    const [informationOpen, setInformationOpen] = useState(false)
    const isJoined = playerState.players.find(
        (player) => player.id === userData.id
    )

    return (
        <>
            <LayoutHeader>
                <LayoutFlex>
                    <HeaderButton>
                        <HeaderIcon src={iconList.staff} />
                    </HeaderButton>
                    {playerState.gameStatus === GameStatus.GUESSING &&
                    isJoined ? (
                        <Timer>{playerState.roundInfo?.timeLeft}</Timer>
                    ) : (
                        <HeaderButton onClick={() => setInformationOpen(true)}>
                            <HeaderIcon src={iconList.information} />
                        </HeaderButton>
                    )}
                    <HeaderButton>
                        <HeaderIcon src={iconList.hamburger} />
                    </HeaderButton>
                </LayoutFlex>
            </LayoutHeader>
            <Modal
                isOpen={informationOpen}
                onRequestClose={() => setInformationOpen(false)}
                customContent={<InstructionModal />}
            />
        </>
    )
}

export default Header
