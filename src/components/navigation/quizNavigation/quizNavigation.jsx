import React from 'react'
import './quizNavigation.scss';
import Timer from '../../quiz/timer/timer';

const quizNavigation = ({numberOfUsedPauses, answerCounters, currentPlayingSoundIndex, numberOfQuestions, ...timerProps}) => (
    <nav className="quiz-navigation">
        <Timer {...timerProps} />
        <div className="nav-btns-container">
            <div className="nav-quiz-item"><div>{currentPlayingSoundIndex}/{numberOfQuestions}</div><span>numer pytania</span></div>
            {numberOfUsedPauses > 0 && 
                <div className="nav-quiz-item"><div>{numberOfUsedPauses}</div><span>pozostałe pauzy</span></div>
            }
            <div className="nav-quiz-item"><div style={{color: '#7CB996'}}>{answerCounters.correct}</div><span>poprawne odpowiedzi</span></div>
            <div className="nav-quiz-item"><div style={{color: '#BD7B7B'}}>{answerCounters.negative}</div><span>negatywne odpowiedzi</span></div>
            
        </div>
    </nav>
);

export default quizNavigation;