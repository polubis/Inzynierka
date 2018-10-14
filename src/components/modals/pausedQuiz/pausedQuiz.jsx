import React from 'react'
import './pausedQuiz.scss';
import Modal from '../../UI/modal/modal';
import Button from '../../UI/button/button';
import Timer from '../../quiz/timer/timer';
const pausedQuiz = ({quizSetting, numberOfUsedPauses, toglePauseState, currentPlayingSoundIndex}) => (
    <Modal timeout={500} show={true} close={toglePauseState} showIcon 
        animationIn="animation-opacity-in" animationOut="animation-opacity-out" backdropInAnimation="open-backdrop-short"
        backdropOutAnimation="hide-backdrop-short">
            <div className="pause-quiz-prompt">
                <p className="modal-header">
                    <i className="fa fa-exclamation-triangle"></i>
                    <span>
                        Gra została wstrzymana
                    </span>
                </p>
                <article>
                    Rozgrywka jest w trakcie chwilowej przerwy. Poniżej wyświetlone są obecne podstawowe statystyki.
                    Pamiętaj, że w trakcie gry obowiązuje Cie skończona liczba przerw. Aktualny stan możesz sprawdzić w 
                    poniższych statystykach. Okno zostanie zamknięte automatycznie po upływie poniżej przedstawionego czasu. 
                    <p>Jeżeli jesteś gotowy/a zamknij okno.</p>
                </article>

                <div className="quiz-info">
                    <div className="column">
                        <p><span>Tryb:</span> {quizSetting.translation}</p>
                        <p><span>Pozostałe przerwy:</span> {numberOfUsedPauses}</p>
                        <p><span>Ilość udzielonych odpowiedzi:</span>{currentPlayingSoundIndex}</p>
                        <p><span>Liczba pytań do zakończenia quizu:</span>{quizSetting.numberOfQuestions - currentPlayingSoundIndex}</p>
                        <div><span>Czas w momencie zatrzymania:</span>
                        <Timer startTime={quizSetting.timeForPause} sizeClass="normal" style={{color: "#7e3131"}}
                        shouldDecrement showPulseAnimation={false} timerEndFunction={toglePauseState}/></div>
                    </div>
                    
                    <div className="row">
                        <Button onClick={toglePauseState} style={{color: "#7e3131", borderColor: "#7e3131"}} name="Kontynuj" className="small-btn quiz-instruction-nt-main-btn"/>
                    </div>
                </div>
            </div>
    </Modal>
);

export default pausedQuiz;