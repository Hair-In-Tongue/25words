import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Title from './Title';

function App() {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={() => <Title />} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
