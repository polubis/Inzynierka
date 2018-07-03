import React from 'react';
import './hamburger.css';
import Transition from 'react-transition-group/Transition';
const hamburger = props => (
    
    <Transition 
    in={props.hamburgerOpen}
    timeout={400}>
        {state => (
            <div onClick={props.changeHamburgerState} className={`hamburger ${props.hamburgerOpen ? 
                "hamburger-on" : "hamburger-off"}`}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )}
    </Transition>
    
);
export default hamburger;
