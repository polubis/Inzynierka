import React from "react";
import "./navbar.scss";
import Logo from "../UI/logo/logo";
import { scrollBottom } from "../../services/componentsMethods";
import Transition from 'react-transition-group/Transition';
import Button from '../UI/button/button';
import MotivesPanel from '../motives/motivesPanel';
class Navbar extends React.PureComponent {
  state = {
    showSidebar: false,
    oldScrollPosition: 0,
    shouldNavBeFixed: false,
    showMotivesPanel: false
  };
  componentDidMount(){
    window.addEventListener('scroll', this.windowScrollHandler);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.windowScrollHandler);
  }
  windowScrollHandler = () => {
    const limit = 125;
    let shouldNavBeFixed = false;

    if(window.scrollY > limit && window.scrollY < this.state.oldScrollPosition){
      shouldNavBeFixed = true;
    }
    this.setState({oldScrollPosition: window.scrollY, shouldNavBeFixed});
  }
  render() {
    const { logout, loginObject } = this.props;
    const { showSidebar, shouldNavBeFixed, showMotivesPanel } = this.state;

    return (
      <React.Fragment>
        <div className="block-for-hold-place"></div>
        <header className={`navbar ${shouldNavBeFixed && "nav-fixed"}`}>
          <Logo type="nav-logo" />

          <div className="btn-holder">

            <div className="motive-container">
              {showMotivesPanel && 
              <MotivesPanel motives={loginObject && loginObject.motives} 
              currentMotive={'initial'} />}

              <Button onClick={() => this.setState({showMotivesPanel: !showMotivesPanel})} 
              name="Motywy" className="navbar-btn toggler" iconOn iClass={`fa ${showMotivesPanel ? 
                "fa-chevron-up" : "fa-chevron-down"}`}/>
            </div>
            
            <Button name="Użytkownicy" className="navbar-btn linked-btn" iconOn iClass="fa fa-users"/>
            <Button name="Instrukcja" className="navbar-btn linked-btn" iconOn iClass="fa fa-leanpub"/>
            <Button name="Odtwarzacz" className="navbar-btn" iconOn iClass="fa fa-headphones"/>
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
                      <span onClick={() =>
                        this.setState({ showSidebar: !showSidebar })}>
                        <i className="fa fa-chevron-right"></i>
                      </span>
                      
                    
                        <button onClick={logout}>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        <button>Twój profil</button>
                        siema
                    </aside>
                )}                   
        </Transition>

      </React.Fragment>
    );
  }
}
export default Navbar;
