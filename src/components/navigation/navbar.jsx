import React from 'react';
import './navbar.css';
import Logo from '../UI/logo/logo';
import { scrollBottom } from '../../services/componentsMethods';
class Navbar extends React.PureComponent{
    state = {
        navbarExtended: false
    }
    extendNavbar = () => {
        const { navbarExtended } = this.state;
        if(!navbarExtended)
            scrollBottom(this.navRef);

        this.setState({navbarExtended: !navbarExtended});
    }
    render(){
        const { navbarExtended } = this.state;
        const { logout } = this.props;
        return (
            <header ref={el => { this.navRef = el }} className={`navbar-container ${navbarExtended ? "nav-extended" : "nav-normal"}`}>
                <Logo type="nav-logo"/>
                
                <span onClick={this.extendNavbar} 
                className={`nav-span ${navbarExtended ? "nav-span-extended" : "nav-span-normal"}`}>
                </span>

                <button onClick={logout}>Wyloguj</button>
            </header>
        );
    }
}
export default Navbar;