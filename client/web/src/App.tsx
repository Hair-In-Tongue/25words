import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import JoinGame from './containers/JoinGame/JoinGame'
import Room from './containers/Room/Room'

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={() => <JoinGame />} />
                    <Route path="/room" component={() => <Room />} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
