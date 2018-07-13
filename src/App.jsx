import React, { Component } from "react";
import RootContainer from "./RootContainer";
import { Switch, BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <RootContainer />
        </Switch>
      </Router>
    );
  }
}

export default App;
