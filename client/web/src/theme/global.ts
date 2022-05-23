import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`${css`
    * {
        font-family: 'Open Sans', sans-serif;
        box-sizing: border-box;
        font-size: 1rem;
    }

    body,
    html {
        height: 100%;
        margin: 0;
    }
`}
`
