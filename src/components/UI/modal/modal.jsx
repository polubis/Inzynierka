import React from 'react';
import Transition from 'react-transition-group/Transition';
import './modal.css';

const modal = props => (
        <Transition 
            mountOnEnter 
            unmountOnExit
            in={props.show}
            timeout={1500}>
                {state => (
                <div className={`backdrop ${props.show ? "open-backdrop" : "hide-backdrop"}`}>
                    <i onClick={props.close} className="fa fa-times"></i>
                    <div className={`modal-container ${props.show ? "modal-container-open" 
                    : "modal-container-close"}`}>
                        {props.children}
                    </div>
                </div>
                )}                   
        </Transition>
    
);

export default modal;