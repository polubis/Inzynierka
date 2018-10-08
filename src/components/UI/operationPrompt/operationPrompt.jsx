import React from 'react'
import './operationPromot.scss';
import Spinner from '../spinner/spinner';
const operationPrompt = ({message, positionClass}) => (
    <div className={`operation-prompt ${positionClass}`}>
        {message} <Spinner />
    </div>
);
operationPrompt.defaultProps = {
    positionClass: "operation-prompt-bleft"
}
export default operationPrompt;