import React from 'react'
import './statsMenu.scss';
import StatusBlock from './statusBlock/statusBlock';

const statsMenu = ({answers, getSoundsStatus, currentPlayingSoundIndex}) => {
    return (
        <aside className="side-stats-menu">
        <ul className={getSoundsStatus ? "enable-result-list-animation" : ""}>
            {answers.map(answer => (
                <li key={answer.id} className={`${currentPlayingSoundIndex === answer.id ? "active-question" : ""} ${answer.answerValue !== null ? answer.isAnswerCorrect ? "correct-answer" : "incorrect-answer" : ""}`}>
                    {currentPlayingSoundIndex === answer.id ?
                        <i className="fa fa-question"></i> :
                        answer.answerValue === null ? 
                        <StatusBlock classes="lock-status-container" icon="lock" status="zablokowane" /> : 
                        answer.isAnswerCorrect ? 
                        <StatusBlock wasPaused={answer.wasPaused} icon="check" status="dobra odpowiedź" time={answer.timeForAnswer} status={answer.answerValue}/> :
                        <StatusBlock wasPaused={answer.wasPaused} icon="times" status="błędna odpowiedź" time={answer.timeForAnswer} status={answer.answerValue}/>                        
                    }
                </li>
            ))}                             
        </ul>
    </aside>
    );
}

export default statsMenu;