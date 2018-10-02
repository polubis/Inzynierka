import React from 'react'
import './quizContent.scss';
import ErrorHoc from '../../../hoc/errorHoc';
import QuizInstruction from './quizInstruction/quizInstruction';
import Timer from '../timer/timer';
import Button from '../../UI/button/button';
import PausedQuizModal from '../../modals/pausedQuiz/pausedQuiz';
import { settings, createAnswers, translatedIndexesInWords, pathToGetSounds } from '../../../services/quizService.js';
import MusicPlayer from '../../musicPlayer/musicPlayer';

class QuizContent extends React.PureComponent{
    state = {
        currentPlayingSoundIndex: -1,
        quizResult: {numberOfPositiveRates: 0, numberOfNegativeRates: 0},
        answers: [],
        isQuizPaused: false,
        numberOfUsedPauses: settings[this.props.quizType].numberOfPauses,
        isQuizFinished: false,
        functionToUseForProbeInMusicPlayer: "",
        shouldResetQuestionsTimer: false
    }

    componentDidMount(){
        if(this.state.answers.length === 0)
            this.setState({answers: createAnswers(this.props.quizType)});
    }

    componentDidUpdate(){
        if(this.state.shouldResetQuestionsTimer){
            this.setState({shouldResetQuestionsTimer: false});
        }
    }

    startQuiz = () => {
      this.setState({currentPlayingSoundIndex: 0, functionToUseForProbeInMusicPlayer: "play"});
    }

    toglePauseState = () => {
       const { isQuizPaused, numberOfUsedPauses } = this.state;
       if(isQuizPaused){
        this.setState({isQuizPaused: false, functionToUseForProbeInMusicPlayer: "unpause"});
       }
       else{
        this.setState({isQuizPaused: true, numberOfUsedPauses: numberOfUsedPauses-1, functionToUseForProbeInMusicPlayer: "pause"});
       }
    }

    exitFromQuiz = () => {
        this.props.history.push("/main");
    }

    handleAnswerAutomaticly = () => {
        const { sounds, quizType } = this.props;
        const { currentPlayingSoundIndex, shouldResetQuestionsTimer } = this.state;
        if(currentPlayingSoundIndex === -1){
            this.startQuiz();
        }
        else{
            const answers = [...this.state.answers];
            const isQuizFinished = currentPlayingSoundIndex === settings[quizType].numberOfQuestions-1;

            answers[currentPlayingSoundIndex].answerValue = currentPlayingSoundIndex % 2 === 0;    
            this.setState({answers, isQuizFinished, currentPlayingSoundIndex: currentPlayingSoundIndex+1, shouldResetQuestionsTimer: true });
        }
    }

    putTimeIntoAnswer = time => {
        // Dodac obsluge dodawania czasu przy kliknieciu, 
        // Dodac dodawanie czasu automatyczne
        // timeForAnswer settings[quizType]
        const copiedAnswers = [...this.state.answers];

        console.log(time, copiedAnswers);
    }

    render(){
        const { currentPlayingSoundIndex, isQuizPaused, numberOfUsedPauses, answers, isQuizFinished, 
            functionToUseForProbeInMusicPlayer, shouldResetQuestionsTimer } = this.state;
        const { downloadSoundsByTypeAgain, getSoundsErrors, getSoundsStatus, sounds, didUserAcceptedPrompt, 
             isDownloadingSoundsAgain, quizType } = this.props;
        return (
            <ErrorHoc errors={getSoundsErrors} isRefresingRequest={isDownloadingSoundsAgain} 
            operation={downloadSoundsByTypeAgain}>
                <aside onClick={this.handleAnswerAutomaticly} className="side-stats-menu">
                    <ul className={getSoundsStatus ? "enable-result-list-animation" : ""}>
                        {answers.map(answer => (
                            <li key={answer.id} className={`${currentPlayingSoundIndex === answer.id ? "active-question" : ""} ${answer.answerValue !== null ? answer.answerValue ? "correct-answer" : "incorrect-answer" : ""}`}>
                                {currentPlayingSoundIndex === answer.id ?
                                    <i className="fa fa-question"></i> :
                                    answer.answerValue === null ? 
                                    <div className="lock-status-container">
                                        <i className="fa fa-lock"></i>
                                        <p>zablokowane</p>
                                    </div> : 
                                    answer.answerValue ? <p>Prawidłowa odpowiedź</p> : 
                                    <p>Błędna odpowiedz</p>
                                }
                            </li>
                        ))}                             
                    </ul>
                </aside>      
                <div className="quiz-content">
                    {isQuizFinished ? <div>Gratulacje udało Ci się ukończyć quiz</div>
                    :
                    <React.Fragment>
                        {currentPlayingSoundIndex === -1 ? 
                            <QuizInstruction startQuiz={this.startQuiz} timerEndFunction={() => this.setState({currentPlayingSoundIndex: 0})}/>
                            :
                            <React.Fragment>
                                <nav className="quiz-navigation">
                                    <Timer accuracy={0.1} showPulseAnimation={false} shouldPause={isQuizPaused} label="cały czas trwania"/>
                                    <div className="nav-btns-container">
                                        {numberOfUsedPauses > 0 && 
                                            <div className="nav-quiz-item"><div>{numberOfUsedPauses}</div><span>pozostałe pauzy</span></div>
                                        }
                                        <div className="nav-quiz-item"><div style={{color: '#7CB996'}}>4</div><span>poprawne odpowiedzi</span></div>
                                        <div className="nav-quiz-item"><div style={{color: '#BD7B7B'}}>6</div><span>negatywne odpowiedzi</span></div>
                                        
                                    </div>
                                </nav>
                                <section>
                                    <div className="section-content">
                                        <h2><span className="dots">Pytanie {translatedIndexesInWords[currentPlayingSoundIndex]}</span></h2>
                                        <article>Jaką nazwe nosi aktualnie odtwarzany dźwięk?</article>
                                        

                                        <Timer resetTimerFunction={this.putTimeIntoAnswer} shouldResetTimer={shouldResetQuestionsTimer} timerEndFunction={this.handleAnswerAutomaticly} shouldDecrement shouldReset 
                                        startTime={settings[quizType].timeForAnswer} accuracy={0.1} showPulseAnimation={false} 
                                        shouldPause={isQuizPaused} />
                                        
                                        {getSoundsStatus && 
                                            <MusicPlayer playerState={functionToUseForProbeInMusicPlayer} musicSource={pathToGetSounds + sounds[currentPlayingSoundIndex]} />
                                        }
                                    </div>
                                    <footer>
                                        <div className="footer-icons">
                                            <i onClick={numberOfUsedPauses !== 0 ? this.toglePauseState : null} 
                                            className={`fa fa-${isQuizPaused ? "play" : "pause"} ${numberOfUsedPauses === 0 ? "disabled-element" : ""}`}></i>
                                        </div>
                                    </footer>
                                </section>
                            </React.Fragment>
                        }
    
                        {currentPlayingSoundIndex === -1 && 
                            <Button onClick={this.exitFromQuiz} name="Wyjdź" className="white-btn medium-btn" />
                        }
                
                        {isQuizPaused && 
                            <PausedQuizModal toglePauseState={this.toglePauseState} quizSetting={settings[quizType]} numberOfUsedPauses={numberOfUsedPauses} /> 
                        }
                    </React.Fragment>
                    }

                    </div>
                   
        </ErrorHoc>  
        );
    }
}

export default QuizContent;