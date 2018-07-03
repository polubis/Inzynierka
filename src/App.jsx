import React, { Component } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import RootContainer from './RootContainer';

class App extends Component {
    render() { 
        return ( 
            <Router>
                <Switch>
                    <RootContainer />
                </Switch>
            </Router>
        )
    }
}
 
export default App;