import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route } from 'react-router-dom';
import Aux from './hoc/hoc';
import Navbar from './components/navigation/navbar';

class RootContainer extends React.PureComponent {
  render() {
    return (
        <Aux>
          <Navbar />
          
          <Route path="/" component={HomePage} />
        </Aux>
    );
  }
}

export default RootContainer;

