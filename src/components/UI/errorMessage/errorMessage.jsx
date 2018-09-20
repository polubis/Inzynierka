import React from 'react'
import './errorMessage.scss';


const errorMessage = ({error, eClass, operation, isRefresingRequest}) => (
    <div className={`err-container ${eClass ? eClass : "standard-error"} ${isRefresingRequest && "requesting-again"}`}>
        <p>
            <div>
                {isRefresingRequest || <i className="fa fa-exclamation"></i>}
                {isRefresingRequest ? "Trwa ponowne wykonywanie operacji..." : error}
            </div>
            {operation && <span><i onClick={operation} className={`fa fa-refresh ${isRefresingRequest && "imit-rotate"}`}></i></span>}
        </p>

          
    </div>
);
export default errorMessage;