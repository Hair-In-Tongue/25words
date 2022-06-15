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
import SettingsModal from '../../Modal/SettingsModal/SettingsModal'
import PlayersListModal from '../../Modal/PlayersList/PlayersListModal'
import theme from '../../../theme'

const Header = () => {
    const { playerState, userData }: IGameProps = useGameContext()
    const [informationOpen, setInformationOpen] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [playersListOpen, setPlayersListOpen] = useState(false)

    const isJoined = playerState.players.find(
        (player) => player.id === userData.id
    )

    const grayBackground = theme.colors.grayBackground

    return (
        <>
            <LayoutHeader>
                <LayoutFlex>
                    <HeaderButton onClick={() => setPlayersListOpen(true)}>
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
                    <HeaderButton onClick={() => setSettingsOpen(true)}>
                        <HeaderIcon src={iconList.hamburger} />
                    </HeaderButton>
                </LayoutFlex>
            </LayoutHeader>
            <Modal
                color={'white'}
                margin={'20px 30px'}
                isOpen={informationOpen}
                onRequestClose={() => setInformationOpen(false)}
                customContent={<InstructionModal />}
            />
            <Modal
                color={grayBackground}
                isOpen={settingsOpen}
                onRequestClose={() => setSettingsOpen(false)}
                customContent={<SettingsModal />}
            />
            <Modal
                color={'white'}
                margin={'20px 30px'}
                isOpen={playersListOpen}
                onRequestClose={() => setPlayersListOpen(false)}
                customContent={<PlayersListModal />}
            />
        </>
    )
}

export default Header
