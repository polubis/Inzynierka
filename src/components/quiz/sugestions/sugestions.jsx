import React from 'react'
import './sugestion.scss';

const sugestionsList = ({sugestions, handleAnswer}) => (
<React.Fragment>
     <p>Sugerowane odpowiedzi</p>
    <div className="sugestions">
        {sugestions.map((sugestion, index) => (
            <span onClick={() => handleAnswer(sugestion)} key={index}>{sugestion}</span>
        ))}
    </div>
</React.Fragment>
);

export default sugestionsList;