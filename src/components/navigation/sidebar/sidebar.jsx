import React from 'react'
import './sidebar.scss';
import Transition from 'react-transition-group/Transition';
import ProfileDetails from './profileDetails/profileDetails';
import { Route } from 'react-router-dom';
import ErrorHoc from '../../../hoc/errorHoc';
class Sidebar extends React.PureComponent{
    state = {
        actualOpenedTab: {title: "Twój profil", icon: "fa-user", path: "profile"}
    }

    sideBarItems = [
        {title: "Użytkownicy", icon: "fa-users", path: "users"},
        {title: "Quizy muzyczne", icon: "fa-music", path: "quizes"},
        {title: "Rankingi", icon: "fa-trophy", path: "ranks"}, 
        {title: "Odtwarzacz", icon: "fa-headphones", path: "player"},
        {title: "Edukacja", icon: "fa-graduation-cap", path: "education"},
        {title: "Motywy", icon: "fa-tint", path: "motives"},
        {title: "Twój profil", icon: "fa-user", path: "profile"},
        {title: "Ustawienia", icon: "fa-cogs", path: "settings"}
    ];

    changeTab = item => {
        const { history, match } = this.props;
        this.setState({actualOpenedTab: item}, () => {
            if(item.path)
                history.push(match.path + "/" + item.path);
        })
    }

    render(){
        const { actualOpenedTab } = this.state;
        const { showSidebar, logout, closeSidebar, history, match, userData, getUserDataErrors, getUserDataACreator } = this.props;
        return (
        <Transition 
            mountOnEnter 
            unmountOnExit
            in={showSidebar}
            timeout={500}>
                {state => (
                    <aside className={`side-bar ${showSidebar ? "side-bar-open" : "side-bar-collapsed"}`}>
                      <span onClick={closeSidebar}>
                        <i className="fa fa-chevron-right"></i>
                      </span>

                      <div className="side-bar-content">
                        <h3>
                            <i className={`fa ${actualOpenedTab.icon}`}></i>
                            <span>{actualOpenedTab.title}</span>
                        </h3>

                        <Route path={`${match.path}/profile`} render={(props) => (
                            <ErrorHoc operation={getUserDataACreator} errors={getUserDataErrors} containerClass="error-in-page-content-container" eClass="standar-oposite-error">
                                <ProfileDetails userData={userData}  />
                            </ErrorHoc>
                        )}/>

                      </div>
                      
                      
                      <div className="controls-container">
                        {this.sideBarItems.map(item => (
                          <button title={item.title} key={item.title} onClick={() => this.changeTab(item)} 
                          className={`${item.class} ${actualOpenedTab.title === item.title && "active-side-bar-btn"}`}>
                            <i className={`fa ${item.icon}`}></i>
                            <span>{item.title}</span>
                          </button>
                        ))}

                        <button title="Wyloguj" onClick={logout} className="logout-btn">
                            <i className="fa fa-bed"></i>
                            <span>Wyloguj</span>
                          </button>
                      </div>
                    </aside>
                )}                   
        </Transition>
        );
    }
}


export default Sidebar;