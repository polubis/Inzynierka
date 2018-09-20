import React from 'react'
import './errorMessage.scss';


const errorMessage = ({error, eClass, operation, isRefresingRequest}) => (
    <div className={`err-container ${eClass ? eClass : "standard-error"} ${isRefresingRequest && "requesting-again"}`}>
        <p>
            <span>
                {isRefresingRequest || <i className="fa fa-exclamation"></i>}
                {isRefresingRequest ? "Trwa ponowne wykonywanie operacji..." : error}
            </span>
            {operation && <span><i onClick={isRefresingRequest ? null : operation} className={`fa fa-refresh ${isRefresingRequest && "imit-rotate"}`}></i></span>}
        </p>
    </div>
);
export default errorMessage;