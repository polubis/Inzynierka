import React from 'react';
import './graphTimer.scss';

const checkWhichEdgeShouldBeRendered = value => {
    let borderClasses = "";
    if(value < 100){
        borderClasses += "circle-right-top ";
    }
    if(value < 75){
        borderClasses += "circle-right-bottom ";
    }
    if(value < 50){
        borderClasses += "circle-left-bottom ";
    }
    if(value < 25){
        borderClasses += "circle-left-top animate-all-borders";
    }

    return borderClasses;
}

const graphTimer = ({value, divider, valueToShow}) => {
    let percentageValue = (value/divider*100);
    const borderClasses = checkWhichEdgeShouldBeRendered(percentageValue, 100);
    return (
        <div className="stats-circle-container">
            <div className={borderClasses}/>
            {valueToShow}
        </div>
    );
}

export default graphTimer;
