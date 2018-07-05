import React, { Component } from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route } from 'react-router-dom';
import RegisterForm from './components/Forms/Register/Register';
import Aux from './hoc/hoc';
import EmailConfirmationPage from './components/EmailConfirmationPage/EmailConfirmationPage';
import LoginForm from './components/Forms/Login/Login';
import { connect } from 'react-redux';
import { setTokenActionCreator, logoutActionCreator } from './store/actions/actions';
import { withRouter } from 'react-router-dom';
class RootContainer extends Component {
  componentDidMount(){
    this.props.setToken();
  }
  render() {
    return (
        <div>
            <div id="bg1"></div>
            <Route path="/" exact component={HomePage} />
            {this.props.token !== "" ? 
              <Aux>
              </Aux>
            :
              <Aux>
                <Route path="/register" exact component={RegisterForm} />
                <Route path="/login" exact component={LoginForm} />
                <Route path="/register/activate/:id" exact component={EmailConfirmationPage} />
              </Aux>

            }
        </div>
    );
  }
}


const mapStateToProps = state => {
  return {
      token: state.Authenticate.token,
      loginResult: state.Authenticate.loginResult
  };
}

const mapDispatchToProps = dispatch => {
  return {
      setToken: () => dispatch(setTokenActionCreator()),
      logout: (history) => dispatch(logoutActionCreator(history))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RootContainer));

