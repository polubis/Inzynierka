import React from 'react';
import './midleContainer.css';
import TutorialBlock from './tutorialBlock/tutorialBlock';
import RightBlocks from './rightBlocks/rightBlocks';
const midleContainer = props => (
    <div className="midle-container">
        <TutorialBlock />    
        <RightBlocks />   
    </div>
);

export default midleContainer;