import React from 'react';
import './navbar.scss';
import Logo from '../UI/logo/logo';
import { scrollBottom } from '../../services/componentsMethods';
class Navbar extends React.PureComponent{
    render(){
        const { logout } = this.props;
        return (
            <header className="navbar">
                <Logo type="nav-logo"/>


                <button onClick={logout}>Wyloguj</button>
                <i className="fa fa-bars"></i>
            </header>
        );
    }
}
export default Navbar;