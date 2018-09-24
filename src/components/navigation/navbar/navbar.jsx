import React from "react";
import "./navbar.scss";
import Logo from "../../UI/logo/logo";
import { scrollBottom } from "../../../services/componentsMethods";
import Transition from 'react-transition-group/Transition';
import Button from '../../UI/button/button';
import MotivesPanel from '../../motives/motivesPanel';
import Sidebar from '../sidebar/sidebar';
import { withRouter } from 'react-router'; 
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
  closeSidebar = () => {
    const { history } = this.props;
    this.setState({showSidebar: false}, () => {
      history.push("/main");
    });
  }
  openSidebar = () => {
    const { history } = this.props;
    this.setState({showSidebar: true}, () => {
      history.push("main/profile");
    });
  }
  render() {
    const { getUserDataACreator, userData, getUserDataErrors, logout, history, match } = this.props;
    const { showSidebar, shouldNavBeFixed, showMotivesPanel, actualOpenedTabTitle } = this.state;

    return (
      <React.Fragment>
        <div className="block-for-hold-place"></div>
        <header className={`navbar ${shouldNavBeFixed && "nav-fixed"}`}>
          <Logo type="nav-logo" />

          <div className="btn-holder">

            <div className="motive-container">
              {showMotivesPanel && 
              <MotivesPanel getUserDataACreator={getUserDataACreator} userData={userData} getUserDataErrors={getUserDataErrors}
              currentMotive={'initial'} />}

              <Button onClick={() => this.setState({showMotivesPanel: !showMotivesPanel})} 
              name="Motywy" className="navbar-btn toggler" iconOn iClass={`fa ${showMotivesPanel ? 
                "fa-chevron-up" : "fa-chevron-down"}`}/>
            </div>
            
            <Button name="Użytkownicy" className="navbar-btn linked-btn" iconOn iClass="fa fa-users"/>
            <Button name="Instrukcja" className="navbar-btn linked-btn" iconOn iClass="fa fa-leanpub"/>
            <Button name="Odtwarzacz" className="navbar-btn" iconOn iClass="fa fa-headphones"/>
            <i onClick={this.openSidebar} className="fa fa-bars"/>
          </div>
        </header>

        <Sidebar userData={userData} getUserDataErrors={getUserDataErrors}
        showSidebar={showSidebar} logout={logout} closeSidebar={this.closeSidebar} 
        history={history} match={match} userData={userData}/>

      </React.Fragment>
    );
  }
}
export default withRouter(Navbar);
