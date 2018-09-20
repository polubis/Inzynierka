import React from "react";
import "./navbar.scss";
import Logo from "../UI/logo/logo";
import { scrollBottom } from "../../services/componentsMethods";
import Transition from 'react-transition-group/Transition';

class Navbar extends React.PureComponent {
  state = {
    showSidebar: false
  };
  render() {
    const { logout } = this.props;
    const { showSidebar } = this.state;
    return (
      <React.Fragment>
        <header className="navbar">
          <Logo type="nav-logo" />

          <div className="btn-holder">
            <button className="navbar-btn toggler">
              Motywy <i className="fa fa-chevron-down" />
            </button>
            <button className="navbar-btn linked-btn">
              Użytkownicy <i className="fa fa-users" />
            </button>
            <button className="navbar-btn linked-btn">
              Instrukcja <i className="fa fa-leanpub" />
            </button>
            <button className="navbar-btn">
              Odtwarzacz <i className="fa fa-headphones" />
            </button>
            <i
              onClick={() =>
                this.setState({ showSidebar: !showSidebar })}
              className="fa fa-bars"
            />
          </div>
        </header>
                
        <Transition 
            mountOnEnter 
            unmountOnExit
            in={showSidebar}
            timeout={500}>
                {state => (
                    <aside className={`side-bar ${showSidebar ? "side-bar-open" : "side-bar-collapsed"}`}>
                        <button onClick={logout}>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                    </aside>
                )}                   
        </Transition>

      </React.Fragment>
    );
  }
}
export default Navbar;
