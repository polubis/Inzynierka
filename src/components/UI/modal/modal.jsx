import React from 'react';
import Transition from 'react-transition-group/Transition';
import './modal.css';

const modal = props => (
        <Transition 
            mountOnEnter 
            unmountOnExit
            in={props.show}
            timeout={props.timeout}>
                {state => (
                <div className={`backdrop ${props.show ? props.backdropInAnimation : props.backdropOutAnimation}`}>
                    {props.showIcon && 
                        <i onClick={props.close} className="fa fa-times"></i>
                    }
                    <div className={`modal-container-base ${props.show ? props.animationIn 
                    : props.animationOut}`}>
                        {props.children}
                    </div>
                </div>
                )}                   
        </Transition>
    
);
modal.defaultProps = {
    animationIn: "animation-from-left-to-right",
    animationOut: "animation-from-right-to-left",
    backdropInAnimation: "open-backdrop",
    backdropOutAnimation: "hide-backdrop",
    timeout: 1500
}
export default modal;