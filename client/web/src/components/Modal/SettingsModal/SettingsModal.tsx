import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../../../translations/i18n'
import { components } from 'react-select'
import {
    Teams,
    FlexBetween,
    Flex,
    Settings,
    Line,
    Button,
    DecksContainer,
    Form,
    Input,
    Title,
    AddButton,
    RemoveButton,
    Icon,
    DecksList,
    ListItem,
    DeckInfo,
    StyledSelect,
    IconContainer,
} from './SettingsModal.styled'
import { useGameContext } from '../../../context/GameProvider'
import { Color } from '../../../../../../api/types'
import { IGameProps } from '../../../interfaces/GlobalInterface'
import JoinTeamButton from '../../JoinTeamButton/JoinTeamButton'
import NicknameInput from '../../NicknameInput/NicknameInput'
import { iconList } from '../../../assets'

const SettingsModal = () => {
    const { t } = useTranslation()
    const { playerState, userData }: IGameProps = useGameContext()
    const { Option } = components

    const playerDetails = playerState.players.find((p) => {
        if (p.id === userData.id) {
            return p
        }
    })
    const disableButtons = true
    const options = [
        {
            value: 'en',
            label: t('languages.english'),
            iconName: 'english',
        },
        {
            value: 'pl',
            label: t('languages.polish'),
            iconName: 'polish',
        },
    ]

    const languageIndex = options.findIndex((language) => {
        const storedLanguage = localStorage.getItem('language') || 'pl'
        return language.value === storedLanguage
    })

    const CustomSelectOption = (props: any) => (
        <Option {...props}>
            <IconContainer language={props.data.iconName} />
            {props.data.label}
        </Option>
    )

    const CustomSingleValue = (props: any) => (
        <>
            <IconContainer language={props.data.iconName} />
            {props.data.label}
        </>
    )

    const setLanguage = (language: string) => {
        localStorage.setItem('language', language)
        i18n.changeLanguage(language)
    }

    const onSelectChange = useCallback(
        (selected) => setLanguage(selected.value),
        [setLanguage]
    )

    return (
        <Settings>
            <Teams>
                <FlexBetween>
                    <JoinTeamButton
                        color={'#005956'}
                        teamColor={Color.BLUE}
                        btnWidth={'144px'}
                    />
                    <JoinTeamButton
                        color={'#95123A'}
                        teamColor={Color.RED}
                        btnWidth={'144px'}
                    />
                </FlexBetween>
                <JoinTeamButton color={'#E3D5C5'} teamColor={Color.GRAY} />
            </Teams>
            <NicknameInput />
            <Line />
            <Button disabled={disableButtons}>
                {t('buttons.checkPreviousRound')}
            </Button>
            {playerDetails?.isAdmin && (
                <DecksContainer>
                    <Form>
                        <Title>{t('settings.enterSetCode')}</Title>
                        <Flex>
                            <Input
                                type="text"
                                placeholder={t('settings.deckCode')}
                                disabled={true}
                            />
                            <AddButton type="button" disabled={disableButtons}>
                                <Icon src={iconList.addIcon} />
                            </AddButton>
                        </Flex>
                    </Form>
                    <DecksList>
                        {playerState?.customDecks.map((customDeck) => (
                            <ListItem key={customDeck?.code}>
                                <DeckInfo>
                                    <p>
                                        {customDeck.name} - {customDeck.code}
                                    </p>
                                </DeckInfo>
                                <RemoveButton disabled={disableButtons}>
                                    <Icon src={iconList.removeIcon} />
                                </RemoveButton>
                            </ListItem>
                        ))}
                    </DecksList>
                </DecksContainer>
            )}

            <StyledSelect
                classNamePrefix={'Select'}
                defaultValue={options[languageIndex]}
                isSearchable={false}
                options={options}
                components={{
                    Option: CustomSelectOption,
                    SingleValue: CustomSingleValue,
                }}
                onChange={onSelectChange}
            />
        </Settings>
    )
}

export default SettingsModal
