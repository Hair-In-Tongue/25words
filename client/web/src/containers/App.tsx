import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import JoinGame from './JoinGame/JoinGame'
import Room from './Room/Room'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/" component={() => <JoinGame />} />
                    <Route path="/room" component={() => <Room />} />
                </Switch>
            </Router>
        </ThemeProvider>
    )
}

export default App
