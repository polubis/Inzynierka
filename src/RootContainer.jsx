import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './components/navigation/navbar';
import Main from './containers/Main/Main';
import { connect } from 'react-redux';
import { setTokenActionCreator } from './store/actions/Authenticate';
import Quiz from './components/quiz/Quiz';
import PrivateRoute from './containers/PrivateRoute/PrivateRoute';

class RootContainer extends React.PureComponent {
  componentDidMount(){
    this.props.setTokenActionCreator();
  }

  render() {
    const { loginResult, loginObject } = this.props;
    return (
        <React.Fragment>
            <PrivateRoute component={Main} 
              isAuthenticated={loginResult} path="/main" pathToRedirect="/login" />

            <PrivateRoute component={HomePage} isAuthenticated={!loginResult} path="/" pathToRedirect="/main" />

            <Route path="/quiz" render={() => {
              return (
                <Quiz path="/quiz" />
              );
            }} />
            
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      loginResult: state.Authenticate.loginResult, 
      loginObject: state.Authenticate.loginObject
  };
}

const mapDispatchToProps = dispatch => {
  return {
      setTokenActionCreator: () => dispatch(setTokenActionCreator())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);


