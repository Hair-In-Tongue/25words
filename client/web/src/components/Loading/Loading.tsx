import React from 'react'
import { Loader, LoadingCard } from './Loading.styled'

const Loading = () => {
    const animateWord = 'LOADING'

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
