import React from "react";
import "./formInput.scss";

const formInput = ({ type, error, title, selectItems, nullable, additionalInputClass, shouldShowLabel, ...props }) => {

  const inputClass = additionalInputClass + " " + (error !== undefined && error ? "invalid-input" : "valid-input");
  let input = null;
  switch (type) {
    case "textarea":
      input = <textarea {...props} id={title} className={inputClass} />;
      break;
    case "select":
      input = (
        <select {...props} id={title} className={inputClass}>
          {selectItems.map(i => {
            return <option key={i.label} value={i.value}>{i.label}</option>;
          })}
        </select>
      );
      break;
    default:
      input = <input {...props} type={type} id={title} className={inputClass} />;
      break;
  }
  return (
    <section className="input-container">
      {shouldShowLabel && 
        <label htmlFor={title}>{title}{nullable || "*"}</label>
      }
      {input}
      {error !== undefined && 
        <p className="u-form-validation">{error && <span>{error}</span>}</p>
      }
    </section>
  );
};
formInput.defaultProps = {
  additionalInputClass: "normal-input",
  shouldShowLabel: true
}

export default formInput;
