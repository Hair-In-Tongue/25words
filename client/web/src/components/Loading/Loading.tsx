import React from 'react'
import { Loader, LoadingCard } from './Loading.styled'
import { useTranslation } from 'react-i18next'

const Loading = () => {
    const { t } = useTranslation()
    const animateWord = t('game.loading').toUpperCase()

    return (
        <>
            <Loader>
                {animateWord.split('').map((letter, i) => (
                    <LoadingCard index={i} key={i}>
                        {letter}
                    </LoadingCard>
                ))}
            </Loader>
        </>
    )
}

export default Loading
