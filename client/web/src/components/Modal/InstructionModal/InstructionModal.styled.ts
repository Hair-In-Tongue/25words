import styled from 'styled-components'

export const Title = styled.h1`
    margin: 0;
    text-align: center;
    font-size: 32px;
    font-weight: 400;
`

export const PlayerLimit = styled.p`
    margin: 0;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
`

export const Description = styled.p`
    margin: 15px 0;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
`

export const RulesHeader = styled.h2`
    color: black;
    font-size: 20px;
    text-align: center;
`

export const Rules = styled.ol`
    padding-left: 0;
    li {
        color: black;
        margin: 15px 0;
        list-style-position: inside;
        font-size: 16px;
        text-align: center;
        overflow-wrap: break-word;
    }
`

export const Decks = styled.div`
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
`

export const Info = styled.h2`
    margin: 0 0 10px 0;
`

export const Website = styled.a`
    display: inline-block;
    width: 100%;
    text-decoration: none;
    text-align: center;
`
