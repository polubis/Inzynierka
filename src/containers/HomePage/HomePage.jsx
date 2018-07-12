import React from "react";
import "./HomePage.css";
import StartPage from "../../components/homePage/StartPage/StartPage";
import Register from "../../components/Forms/Register/Register";
import Login from "../../components/Forms/Login/Login";
import ConfigureModal from "../../components/quiz/configureModal/configureModal";
import TestQuiz from '../../components/quiz/testQuiz/testQuiz';
class HomePage extends React.PureComponent {
  state = {
    currentBlockNumber: 3,
    openConfigureModal: false
  }
  chooseBlock = () => {
    switch (this.state.currentBlockNumber) {
      case 1:
        return (
          <Register
            backIntoMainView={() => this.setState({ currentBlockNumber: 0 })}
          />
        );
      case 2:
        return (
          <Login
            backIntoMainView={() => this.setState({ currentBlockNumber: 0 })}
          />
        );
      case 3:
        return (
          <TestQuiz 
          backIntoMainView={() => this.setState({ currentBlockNumber: 0 })} 
          />
        );
      default:
        return (
          <StartPage
            changeOnTestQuiz={() => this.setState({ openConfigureModal: true })}
            changeOnLogin={() => this.setState({ currentBlockNumber: 2 })}
            changeOnRegister={() => this.setState({ currentBlockNumber: 1 })}
          />
        );
    }
  };
  render() {
    const { openConfigureModal } = this.state;
    return (
      <main className="home-page">
        {this.state.currentBlockNumber !== 3 && 
          <div id="bg2" />
        }
        {this.chooseBlock()}
        <ConfigureModal
          openQuiz={() => this.setState({currentBlockNumber: 3, openConfigureModal: false})}
          close={() => this.setState({ openConfigureModal: false })}
          show={openConfigureModal}
        />
      </main>
    );
  }
}

export default HomePage;
