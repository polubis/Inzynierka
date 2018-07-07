import React, { Component } from "react";
import "./HomePage.css";
import StartPage from "../../components/homePage/StartPage/StartPage";
import Register from '../../components/Forms/Register/Register';
import Login from '../../components/Forms/Login/Login';
class HomePage extends Component {
  state = {
    currentBlockNumber: 0
  };
  chooseBlock = () => {
    switch (this.state.currentBlockNumber) {
      case 1:
        return (
          <Register backIntoMainView={() => this.setState({ currentBlockNumber: 0 })}/>
        );
      case 2:
        return (
          <Login backIntoMainView={() => this.setState({ currentBlockNumber: 0 })}/>
        );
      default:
        return (
          <StartPage
            changeOnLogin={() => this.setState({currentBlockNumber: 2})}
            changeOnRegister={() => this.setState({ currentBlockNumber: 1 })}
          />
        );
    }
  }
  render() {
    return (
      <main className="home-page">
        <div id="bg2" />
        {this.chooseBlock()}
      </main>
    );
  }
}

export default HomePage;
