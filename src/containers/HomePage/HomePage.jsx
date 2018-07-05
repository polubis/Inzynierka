import React, { Component } from "react";
import "./HomePage.css";
import Button from "../../components/UI/button/button";
import StartPage from "../../components/homePage/StartPage/StartPage";
class HomePage extends Component {
  state = {
    currentBlockNumber: 0
  };
  chooseBlock = () => {
    switch (this.state.currentBlockNumber) {
      case 1:
        break;
      default:
        return (
          <StartPage
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
