import React from 'react'
import './operationPromot.scss';
import Spinner from '../spinner/spinner';
const operationPrompt = ({message}) => (
    <div className="operation-prompt">
        {message} <Spinner />
    </div>
);

export default operationPrompt;