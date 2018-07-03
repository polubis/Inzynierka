import React from 'react';
import './full-prompt.css';

const fullPrompt = props => (
    <p className={props.promptType}>
        {props.message}
        {props.promptIcon}
    </p>
);
export default fullPrompt;