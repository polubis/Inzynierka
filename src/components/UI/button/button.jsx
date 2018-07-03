import React from 'react';
import './button.css';

const button = props => (
    <button onClick={props.onClick} className={props.btnClasses}>
        {props.name}
        {props.iconOn &&
            <i className={props.iClass}></i>
        }
    </button>
);

export default button;