import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route, Redirect, Switch } from 'react-router-dom';
import Main from './containers/Main/Main';
import { connect } from 'react-redux';
import Quiz from './components/quiz/Quiz';

class RootContainer extends React.PureComponent {
  render() {
    const { loginResult } = this.props;
    return (
        <React.Fragment>
            <Route component={Main} path="/main" />

            <Route path="/quiz/:type" component={Quiz} />
            
            {loginResult || 
              <Route component={HomePage} path="/" />
            }
            
            <Redirect to={loginResult ? "/main" : "/login"} />
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


