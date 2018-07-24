import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './components/navigation/navbar';
import Main from './containers/Main/Main';
import { connect } from 'react-redux';
import { setTokenActionCreator } from './store/actions/Authenticate';
class RootContainer extends React.PureComponent {
  componentDidMount(){
    this.props.setTokenActionCreator();
  }
  render() {
    const { loginResult } = this.props;
    return (
        <React.Fragment>
          <Navbar loginResult/>
            <Route path="/main" render={() => {
              return (
                loginResult === true ? <Main /> : <Redirect to="/login" />
              );
            }} /> 

            <Route path="/" render={() => {
              return (
                loginResult === true ? <Redirect to="/main" /> : 
                <HomePage />
              );
            }} />
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
      setTokenActionCreator: () => dispatch(setTokenActionCreator())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);


