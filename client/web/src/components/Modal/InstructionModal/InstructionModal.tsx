import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    Title,
    PlayerLimit,
    Description,
    RulesHeader,
    Rules,
    Decks,
    Info,
    Website,
} from './InstructionModal.styled'

const InstructionModal = () => {
    const { t } = useTranslation()
    return (
        <div>
            <div>
                <Title>{t('instructions.title')}</Title>
                <PlayerLimit>{t('instructions.playerLimit')}</PlayerLimit>
                <Description>{t('instructions.description')}</Description>
            </div>
            <div>
                <RulesHeader>{t('instructions.rules')}</RulesHeader>
                <Rules>
                    <li>{t('instructions.firstRule')}</li>
                    <li>{t('instructions.secondRule')}</li>
                    <li>{t('instructions.thirdRule')}</li>
                    <li>{t('instructions.fourthRule')}</li>
                    <li>{t('instructions.fifthRule')}</li>
                </Rules>
            </div>
            <Decks>
                <Info>{t('instructions.addPackages')}</Info>
                <Website>strona.pl/25words</Website>
            </Decks>
        </div>
    )
}

export default InstructionModal
