import React from 'react'
import './errorMessage.scss';


const errorMessage = ({error, eClass, operation}) => (
    <div className={`err-container ${eClass ? eClass : "standard-error"}`}>
        <p>
            {error} 
            {operation && <span><i onClick={operation} className="fa fa-refresh"></i></span>}
        </p>
        <div className="animated-error-occured"></div>

          
    </div>
);
export default errorMessage;