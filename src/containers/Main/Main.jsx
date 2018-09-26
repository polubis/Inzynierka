import React, { Component } from "react";
import "./Main.css";
import { Route, Switch } from "react-router-dom";
import MainStartPage from "../../components/main/mainPage";
import { scrollBottom } from "../../services/componentsMethods";
import { withRouter } from "react-router";
import { logoutActionCreator } from "../../store/actions/Authenticate.js";
import Navbar from "../../components/navigation/navbar/navbar";
import { connect } from "react-redux";
import { getUserDataACreator } from '../../store/actions/User.js';
import OperationPrompt from '../../components/UI/operationPrompt/operationPrompt';
import ErrorHoc from '../../hoc/errorHoc';
import Quiz from '../../components/quiz/Quiz';
class Main extends Component {
  state = {
    isUserDataLoadingAgain: false,
    isUserLoadingDataAfterError: false
  }
  componentDidMount() {
    if(this.props.userData === null){
      this.loadUserData(true, "isUserDataLoadingAgain");
    }
  }

  loadUserData = (shouldScroll, operationName) => {
    this.setState({[operationName]: true});
      this.props.getUserDataACreator().then(() => {
        this.setState({[operationName]: false}, () => {
          if(shouldScroll) this.scrollToBottomHandler();
        })
      });
  }
  
  scrollToBottomHandler = () => {
      if (this.scrollRef) scrollBottom(this.scrollRef); 
  }

  render() {
    const { isUserDataLoadingAgain, isUserLoadingDataAfterError } = this.state;
    const { push } = this.props.history;
    const { logoutActionCreator, getUserDataACreator, history, userData, getUserDataErrors } = this.props;
    return (
      <section className="main">
        <Navbar
          userData={userData}
          getUserDataErrors={getUserDataErrors}
          logout={() => logoutActionCreator(history, "/")}
          getUserDataACreator={getUserDataACreator}
        />
      
        <Switch>

          <Route path="/main/quiz/:type" component={Quiz} />
          
          {isUserDataLoadingAgain ? <OperationPrompt /> : 
          <Route
            path="/main"
            render={() => {
              return (
                <MainStartPage
                  push={push}
                  scrollRef={el => {
                    this.scrollRef = el;
                  }}
                />
              );
            }}
            />
          }
        </Switch>
        

        <ErrorHoc eClass="whole-page-error" errors={getUserDataErrors} isRefresingRequest={isUserLoadingDataAfterError} 
            operation={() => this.loadUserData(false, "isUserLoadingDataAfterError")}><span/></ErrorHoc>
        
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.User.userData,
    getUserDataErrors: state.User.getUserDataErrors

  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutActionCreator: (history, path) =>
      dispatch(logoutActionCreator(history, path)),
      getUserDataACreator: () => dispatch(getUserDataACreator())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
