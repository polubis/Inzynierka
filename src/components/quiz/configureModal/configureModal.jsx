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
            <h2>Mistrz akordów</h2>
            Rozpoznawaj akordy i wchodzące w ich skład dźwięki. Odtworzona próbka dźwiękowa z akordem
            będzie trwała określony czas. Twoim zadaniem będzie ustalić jego nazwę zanim będzie za późno.
          </article>
        );
      case 2:
        return (
          <article>
            <h2>Interwałowy król</h2>
            Wykrywaj różnice pomiędzy akordami na podstawie interwałów. Każdy akord zostanie puszczony wraz
            z jego odpowiednikiem powiększonym lub zwiększonym o losowy interwał. 
          </article>
        );
      default:
        return (
          <article>
            <h2>Adept dźwięków</h2>
            Ten tryb pozwoli Ci przetestować podstawowe możliwości naszego
            serwisu. W prosty sposób możesz wybrać interesującą Cię gamę, a
            następnie rozpocząć rozpoznawanie dźwięków, które będą puszczane po
            sobie po kolei.
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
      <Modal close={close} show={show}>
        <div className="modal-content-container">
          <header
            style={{ backgroundImage: `url(${Bg})` }}
            className="top-content"
          >
            <nav className="modal-icons-container">
              <span onMouseOver={() => this.setState({whichBlockShouldBeShow: 0})}>
                <i className="fa fa-music" />
              </span>
              <span onMouseOver={() => this.setState({whichBlockShouldBeShow: 1})}>
                <i className="fa fa-play" />
              </span>

              <span onMouseOver={() => this.setState({whichBlockShouldBeShow: 2})}>
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
