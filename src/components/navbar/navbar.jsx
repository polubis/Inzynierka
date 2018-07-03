import React from 'react';
import './navbar.css';
import Hamburger from '../UI/hamburger/hamburger';
import { Link } from 'react-router-dom';
import Button from '../UI/button/button';
const navbar = props => (
    <nav className={`navbar ${props.colorNavbar ? "navbar-colored" : null}`}>
        <div style={{color: (props.hamburgerOpen && !props.colorNavbar) ? 'black' : 'white'}} className="logo">
            Music Quiz
        </div>
        {!props.isLogged ?
        <div className="auth-btns-container">
            <Link to="/login">Zaloguj się</Link>
            <Link to="/register">Rejestracja</Link>
        </div>

        :
        
        <div className="auth-btns-container">
            <Button 
            btnClasses="logout-btn"
            onClick={props.logout}
            iconOn={true}
            iClass="fa fa-sign-out"/>
        </div>
        }
        
        <Hamburger changeHamburgerState={props.changeHamburgerState}
        hamburgerOpen={props.hamburgerOpen} />
        
        <i onClick={props.toggleBottomPanel} 
        style={{left: props.hamburgerOpen ? '-5px' : '0', opacity: 
        props.colorNavbar ? '0' : '1'}} className="fa fa-music"></i>
        
        <div className="abs-nav-buttons">
            <button>Ranking</button>
            <button>O projekcie</button>
        </div>
    </nav>
);

export default navbar;