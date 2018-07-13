import React from 'react';
import './navbar.css';

class Navbar extends React.PureComponent{
    state = {
        navbarExtended: false
    }
    render(){
        const { navbarExtended } = this.state;
        return (
            <header className={`navbar-container ${navbarExtended ? "nav-extended" : "nav-normal"}`}>
                <div className="logo">
                    <span>M</span><span>Compose</span>
                </div>
                
                <span onClick={() => this.setState({navbarExtended: !navbarExtended})} 
                className={`nav-span ${navbarExtended ? "nav-span-extended" : "nav-span-normal"}`}>
                </span>

            </header>
        );
    }
}
export default Navbar;