import React from "react";
import "./HomePage.css";
import StartPage from "../../components/homePage/StartPage/StartPage";
import Register from "../../components/Forms/Register/Register";
import Login from "../../components/Forms/Login/Login";
import ConfigureModal from "../../components/quiz/configureModal/configureModal";
import TestQuiz from '../../components/quiz/testQuiz/testQuiz';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

class HomePage extends React.PureComponent {
  state = {
    currentBlockNumber: 0,
    openConfigureModal: false
  }
  pushIntoRoute = path => {
    this.props.history.push(path);
  }
  render() {
    const { openConfigureModal } = this.state;
    return (
      <main className="home-page">
        {this.state.currentBlockNumber !== 3 && 
          <div id="bg2" />
        }
        
        <Route path="/" render={() => {
          return ( <StartPage changeOnTestQuiz={() => this.setState({ openConfigureModal: true })} 
          pushIntoRoute={this.pushIntoRoute}/> )
        }} exact />

        <Route path="/register" exact render={() => {
          return (
            <Register pushIntoRoute={this.pushIntoRoute} />
          )
        }} />

        <Route path="/login" render={() => {
          return (
            <Login pushIntoRoute={this.pushIntoRoute} />
          )
        }} />

        <Route path="/register/activate/:id" render={() => {
          return (
            <div className="confirm-register-container">
              Tu bedzie informacja o pomyslnym zalozeniu konta
            </div>
          )
        }} />

        <ConfigureModal
          openQuiz={() => this.setState({currentBlockNumber: 3, openConfigureModal: false})}
          close={() => this.setState({ openConfigureModal: false })}
          show={openConfigureModal}
        />
      </main>
    );
  }
}

export default withRouter(HomePage);
