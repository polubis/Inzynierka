import React from "react";
import "./HomePage.css";
import StartPage from "../../components/homePage/homePage";
import Register from "../../components/Forms/Register/Register";
import Login from "../../components/Forms/Login/Login";
import ConfigureModal from "../../components/quiz/configureModal/configureModal";
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import ConfirmRegisterPage from '../../components/Forms/Register/confirmRegisterPage/confirmRegisterPage';

class HomePage extends React.PureComponent {
  state = {
    openConfigureModal: false
  }
  pushIntoRoute = path => {
    this.props.history.push(path);
  }
  openQuiz = () => {
    this.setState({openConfigureModal: false});
    this.pushIntoRoute("/quiz/basic");
  }
  render() {
    const { openConfigureModal } = this.state;
    return (
      <main className="home-page">
        <div id="bg2" />
        
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
            <ConfirmRegisterPage redirectToHomePage={this.props.history.push}/>
          )
        }} />

        <ConfigureModal
          openQuiz={this.openQuiz}
          close={() => this.setState({ openConfigureModal: false })}
          show={openConfigureModal}
        />
      </main>
    );
  }
}


export default withRouter(HomePage);

