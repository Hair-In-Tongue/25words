import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import GlobalStyles from './theme/global'

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
