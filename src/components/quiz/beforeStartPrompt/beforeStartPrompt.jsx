import React from 'react';
import "./beforeStartPrompt.css";
import Button from "../../UI/button/button";

const beforeStartPrompt = ({header, content, ...btnProps}) => (
    <div className="before-start-prompt">
        <h3>{header}</h3>         
        <article>{content}</article>   
        <Button {...btnProps}/>
    </div>
);

export default beforeStartPrompt;