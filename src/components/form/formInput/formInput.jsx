import React from 'react'
import './formInput.css';

const formInput = ({type, error, title, ...props}) => {
    const inputClass = error ? "invalid-input" : "valid-input";
    let input = null;
    switch(type){
        case "textarea":
            input = <textarea {...props} className={inputClass}></textarea>
        break;
        default:
            input = (<input {...props} type={type} 
            className={inputClass} /> );
        break;
    }
    return (
        <section className="input-container">
            <label>{title}</label>
            {input}
            <p className="u-form-validation">
                {error &&
                    <span>{error}</span>
                }
            </p>
        </section>
    );
}

export default formInput;