import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './components/navigation/navbar';
import Main from './containers/Main/Main';
import { connect } from 'react-redux';
import Quiz from './components/quiz/Quiz';
import PrivateRoute from './containers/PrivateRoute/PrivateRoute';

class RootContainer extends React.PureComponent {
  render() {
    const { loginResult } = this.props;
    return (
        <React.Fragment>
            <PrivateRoute component={Main} 
              isAuthenticated={loginResult} path="/main" pathToRedirect="/login" />

            <Route path="/quiz" render={() => {
              return (
                <Quiz path="/quiz" />
              );
            }} />

            <Route component={HomePage} path="/" />
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      loginResult: state.Authenticate.loginResult
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);


