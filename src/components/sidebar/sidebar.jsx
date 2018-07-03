import React from 'react';
import './sidebar.css';
import Transition from 'react-transition-group/Transition';
const sidebar = props => (
    <Transition 
    unmountOnExit
    mountOnEnter
    in={props.hamburgerOpen}
    timeout={1500}>
        {state => (
            <nav className={`${props.hamburgerOpen ? "side-bar-on" : "side-bar-off"}`}>
            </nav>
        )}
    </Transition>
);

export default sidebar;