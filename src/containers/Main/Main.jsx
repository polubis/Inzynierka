import React, { Component } from "react";
import "./Main.css";
import { Route } from "react-router-dom";
import MainStartPage from "../../components/main/mainPage";
import { scrollBottom } from "../../services/componentsMethods";
import { withRouter } from "react-router";
import { logoutActionCreator } from "../../store/actions/Authenticate";
import Navbar from "../../components/navigation/navbar";
import { connect } from "react-redux";
import { getUserDataACreator } from '../../store/actions/User.js';

class Main extends Component {
  componentDidMount() {
    if (this.scrollRef) scrollBottom(this.scrollRef); 

    if(this.props.userData === null)
      this.props.getUserDataACreator();
  }

  render() {
    const { push } = this.props.history;
    const { logoutActionCreator, history, userData, getUserDataErrors } = this.props;
    return (
      <section className="main">
        <Navbar
          userData={userData}
          getUserDataErrors={getUserDataErrors}
          logout={() => logoutActionCreator(history, "/")}
        />
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
