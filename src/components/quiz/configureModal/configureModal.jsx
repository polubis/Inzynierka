import React from "react";
import "./configureModal.css";
import Modal from "../../UI/modal/modal";
import Bg from "../../../assets/bgs/modal-top-pic.jpg";
import Button from "../../UI/button/button";

class ConfigureModal extends React.PureComponent {
  state = {
    whichBlockShouldBeShow: 0
  };
  chooseCorrectBlock = () => {
    const { whichBlockShouldBeShow } = this.state;
    switch (whichBlockShouldBeShow) {
      case 1:
        return (
          <article>
            <h2>Samouczek</h2>
            Podstawowa funkcja systemu MCompose. Polega na przechodzeniu 
            ustalonej liczby pytań przez użytkownika oraz obejmuje wybrane typy próbek dźwiękowych. 
            Niestety bez posiadania konta funkcja tego trybu jest ograniczona.
          </article>
        );
      case 2:
        return (
          <article>
            <h2>Tryby dźwięków i akordów</h2>
            Tryby pozwalają na przejście quizu składającego się z 10 oraz 20 pytań. 
            Wynik rozgrywki zapisywany jest w rankingu. Niestety bez posiadania konta funkcja tego trybu jest 
            niedostępna.
          </article>
        );
      default:
        return (
          <article>
            <h2>Tryb dynamiczny oraz tryb interwałów</h2>
            Tryby dynamiczny pozwala na dostosowanie zasad quizu pod konkretnego użytkownika. 
            Wynik rozgrywki nie jest zapisywany w rankingu. 
            Tryb interwałów pozwala na rozegranie quizu składającego się z puszczonych kolejno po 
            sobie próbek dźwiękowych. Jego wynik jest zapisywany w rankingu.
            Niestety bez posiadania konta oba tryby są niedostępne.
          </article>
        );
    }
  };
  render() {
    const { whichBlockShouldBeShow } = this.state;

    const { close } = this.props;
    const { show } = this.props;
    const { openQuiz } = this.props;
    return (
      <Modal close={close} show={show} showIcon={true}>
        <div className="modal-content-container">
          <header
            style={{ backgroundImage: `url(${Bg})` }}
            className="top-content"
          >
            <nav className="modal-icons-container">
              <span onClick={() => this.setState({whichBlockShouldBeShow: 0})}>
                <i className="fa fa-music" />
              </span>
              <span onClick={() => this.setState({whichBlockShouldBeShow: 1})}>
                <i className="fa fa-play" />
              </span>

              <span onClick={() => this.setState({whichBlockShouldBeShow: 2})}>
                <i className="fa fa-headphones" />
              </span>
            </nav>
          </header>

          <div className="bottom-content">
            {this.chooseCorrectBlock()}
            <Button
            disabled={whichBlockShouldBeShow > 0 ? true : false} 
            onClick={openQuiz} name="Rozpocznij" className="medium-btn check-out-btn" />
          </div>
        </div>
      </Modal>
    );
  }
}

export default ConfigureModal;
