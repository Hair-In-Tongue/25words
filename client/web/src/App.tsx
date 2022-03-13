import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Title from "./Title";
import Game from "./Game";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={() => <Title />} />
            <Route path="/game" component={() => <Game />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
