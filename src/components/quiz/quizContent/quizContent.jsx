import React from 'react'
import './quizContent.scss';
import ErrorHoc from '../../../hoc/errorHoc';
import QuizInstruction from './quizInstruction/quizInstruction';
import Timer from '../timer/timer';
import Button from '../../UI/button/button';
import PausedQuizModal from '../../modals/pausedQuiz/pausedQuiz';
import { settings, createAnswers } from '../../../services/quizService.js';

class QuizContent extends React.PureComponent{
    state = {
        currentPlayingSoundIndex: -1,
        quizResult: {numberOfPositiveRates: 0, numberOfNegativeRates: 0},
        answers: [],
        isQuizPaused: false,
        numberOfUsedPauses: settings[this.props.quizType].numberOfPauses,
        isQuizFinished: false
    }

    componentDidMount(){
        if(this.state.answers.length === 0)
            this.setState({answers: createAnswers(this.props.quizType)});
    }

    startQuiz = () => {
      this.setState({currentPlayingSoundIndex: 0});   
    }

    toglePauseState = () => {
       const { isQuizPaused, numberOfUsedPauses } = this.state;
       if(isQuizPaused){
        this.setState({isQuizPaused: false, numberOfUsedPauses: numberOfUsedPauses-1});
       }
       else{
        this.setState({isQuizPaused: true});
       }
    }

    exitFromQuiz = () => {
        this.props.history.push("/main");
    }

    handleAnswer = () => {
        const { sounds, quizType } = this.props;
        const { currentPlayingSoundIndex } = this.state;
        if(currentPlayingSoundIndex === -1){
            this.startQuiz();
        }
        else{
            const answers = [...this.state.answers];
            const isQuizFinished = currentPlayingSoundIndex === settings[quizType].numberOfQuestions-1;

            answers[currentPlayingSoundIndex].answerValue = currentPlayingSoundIndex % 2 === 0;    
            this.setState({answers, isQuizFinished, currentPlayingSoundIndex: currentPlayingSoundIndex+1});
        }
    }

    render(){
        const { currentPlayingSoundIndex, isQuizPaused, numberOfUsedPauses, answers, isQuizFinished } = this.state;
        const { downloadSoundsByTypeAgain, getSoundsErrors, getSoundsStatus, didUserAcceptedPrompt, 
             isDownloadingSoundsAgain, quizType } = this.props;
        return (
            <ErrorHoc errors={getSoundsErrors} isRefresingRequest={isDownloadingSoundsAgain} 
            operation={downloadSoundsByTypeAgain}>
                <aside onClick={this.handleAnswer} className="side-stats-menu">
                    <ul className={getSoundsStatus ? "enable-result-list-animation" : ""}>
                        {answers.map(answer => (
                            <li key={answer.id} className={`${currentPlayingSoundIndex === answer.id ? "active-question" : ""} ${answer.answerValue !== null ? answer.answerValue ? "correct-answer" : "incorrect-answer" : ""}`}>
                                {currentPlayingSoundIndex < answer.id ?
                                    <div className="lock-status-container">
                                        <i className="fa fa-lock"></i>
                                        <p>zablokowane</p>
                                    </div>
                                    :
                                    currentPlayingSoundIndex === answer.id && 
                                    <i className="fa fa-question"></i>  
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
                                    <Timer showPulseAnimation={false} shouldPause={isQuizPaused} label="cały czas trwania"/>
                                    <div className="nav-btns-container">
                                        <div style={{color: numberOfUsedPauses === 0 ? "red" : "#B0B0B0"}} className="nav-quiz-item"><div>{numberOfUsedPauses}</div><span style={{color: numberOfUsedPauses === 0 ? "red" : "#B0B0B0"}}>pozostałe pauzy</span></div>
                                        <div className="nav-quiz-item"><div>4</div><span>poprawne odpowiedzi</span></div>
                                        <div className="nav-quiz-item"><div style={{color: '#BD7B7B'}}>6</div><span>negatywne odpowiedzi</span></div>
                                        
                                    </div>
                                </nav>
                                <section>
                                    <div className="section-content">
                                        dssad
                                    </div>
                                    <footer>
                                        <div className="footer-icons">
                                            <i onClick={numberOfUsedPauses !== 0 ? this.toglePauseState : null} 
                                            className={`fa fa-${isQuizPaused ? "play" : "pause"} ${numberOfUsedPauses === 0 ? "disabled-element" : ""}`}></i>
                                            </div>
                                    </footer>
                                </section>
                                {getSoundsStatus && 
                                    <audio src="http://localhost:52535/sounds/G_sound_3.mp3" ref={el => { this.player = el; }} type="audio/ogg">
                                    </audio>
                                }
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