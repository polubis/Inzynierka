import React from 'react';
import './button.css';

const button = ({name, iconOn, iClass, ...props}) => (
    <button {...props}>
        {name}
        {iconOn &&
            <i className={iClass}></i>
        }
    </button>
);

export default button;