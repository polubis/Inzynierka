import React, { Component } from 'react';
import HomePage from './containers/HomePage/HomePage';
import Navbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import BottomPanel from './containers/BottomPanel/BottomPanel';
import { Route } from 'react-router-dom';
import RegisterForm from './components/Forms/Register/Register';
import Aux from './hoc/hoc';
import EmailConfirmationPage from './components/EmailConfirmationPage/EmailConfirmationPage';
import LoginForm from './components/Forms/Login/Login';
import MainPage from './containers/MainPage/MainPage';
import { connect } from 'react-redux';
import { setTokenActionCreator, logoutActionCreator } from './store/actions/actions';
import { withRouter } from 'react-router-dom';
class RootContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      hamburgerOpen: false,
      bottomPanelOpen: false,
      colorNavbar: false
    }
    this.windowScrollHandler = this.windowScrollHandler.bind(this);
  }
  windowScrollHandler = () => {
    if(window.scrollY >= 5){
      this.setState({colorNavbar: true});    
    }
    else
      this.setState({colorNavbar: false});    
}
  componentDidMount(){
    window.addEventListener('scroll', this.windowScrollHandler);
    this.props.setToken();
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.windowScrollHandler);
  }

  render() {
    return (
        <Aux>
          <Navbar 
            logout={() => this.props.logout(this.props.history)}
            isLogged={this.props.loginResult}
            colorNavbar={this.state.colorNavbar}
            hamburgerOpen={this.state.hamburgerOpen} 
            changeHamburgerState={() => this.setState({hamburgerOpen: !this.state.hamburgerOpen, bottomPanelOpen: false})} 
            toggleBottomPanel={() => this.setState({hamburgerOpen: false, bottomPanelOpen: !this.state.bottomPanelOpen})} />
                  
          <Sidebar hamburgerOpen={this.state.hamburgerOpen} />
                  
          <BottomPanel  
            openBottomPanel={this.state.bottomPanelOpen} />

            <Route path="/" exact component={HomePage} />
           
            {this.props.token !== "" ? 
              <Aux>
                <Route path="/logged" exact component={MainPage} />
              </Aux>
            :
              <Aux>
                <Route path="/register" exact component={RegisterForm} />
                <Route path="/login" exact component={LoginForm} />
                <Route path="/register/activate/:id" exact component={EmailConfirmationPage} />
              </Aux>

            }
        </Aux>
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

