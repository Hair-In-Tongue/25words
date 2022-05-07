import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import CreateGame from './CreateGame/CreateGame'
import Room from './Room/Room'
import { ThemeProvider } from 'styled-components'
import { store, persistor } from '../store/store'
import { Provider } from 'react-redux'
import theme from '../theme'
import { PersistGate } from 'redux-persist/integration/react'
import '../translations/i18n'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={() => <CreateGame />}
                            />
                            <Route path="/room" component={() => <Room />} />
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    )
}

export default App
