import React from 'react';
import './server-error.css';

const serverError = props => (
    <p className="server-error">
        {props.error}
    </p>
);

export default serverError;