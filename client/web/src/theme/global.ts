import { createGlobalStyle, css } from 'styled-components'
import theme from '.'

export default createGlobalStyle`${css`
    * {
        font-family: 'Poppins', sans-serif;
        box-sizing: border-box;
        font-size: 1rem;
    }

    body,
    html {
        height: 100%;
        background-color: ${theme.colors.background};
    }
`}
`
