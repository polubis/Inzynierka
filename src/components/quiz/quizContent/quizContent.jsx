import React from 'react'
import './quizContent.scss';
import ErrorHoc from '../../../hoc/errorHoc';
import QuizInstruction from './quizInstruction/quizInstruction';
import Timer from '../timer/timer';
import Button from '../../UI/button/button';
import PausedQuizModal from '../../modals/pausedQuiz/pausedQuiz';
import { settings } from '../../../services/quizService.js';
class AnswerModel {
    constructor(indexOfAnswer, timeForAnswer, wasAnswerCorrect, multiplier){
        this.indexOfAnswer = indexOfAnswer;
        this.timeForAnswer = timeForAnswer;
        this.wasAnswerCorrect = wasAnswerCorrect;
        this.multiplier = multiplier;
    }
}

class QuizContent extends React.PureComponent{
    state = {
        currentPlayingSoundIndex: -1,
        quizResult: {numberOfPositiveRates: 0, numberOfNegativeRates: 0},
        answers: [],
        isQuizPaused: false,
        numberOfUsedPauses: settings[this.props.quizType].numberOfPauses
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

    render(){
        const { currentPlayingSoundIndex, isQuizPaused, numberOfUsedPauses } = this.state;
        const { downloadSoundsByTypeAgain, getSoundsErrors, sounds, getSoundsStatus, didUserAcceptedPrompt, 
             isDownloadingSoundsAgain, levels, quizType } = this.props;
        return (
            <ErrorHoc errors={getSoundsErrors} isRefresingRequest={isDownloadingSoundsAgain} 
            operation={downloadSoundsByTypeAgain}>
            <aside onClick={() => this.setState({currentPlayingSoundIndex: currentPlayingSoundIndex+1})} className="side-stats-menu">
                <ul className={getSoundsStatus ? "enable-result-list-animation" : ""}>
                    {sounds.map((sound, index) => (
                        <li key={index} className={currentPlayingSoundIndex === index ? "active-question" : ""}>
                            {currentPlayingSoundIndex < index ?
                                <div className="lock-status-container">
                                    <i className="fa fa-lock"></i>
                                    <p>zablokowane</p>
                                </div>
                                :
                                currentPlayingSoundIndex === index && 
                                <i className="fa fa-question"></i>  
                            }
                        </li>
                    ))}                             
              </ul>
            </aside>      
            <div className="quiz-content">
                {currentPlayingSoundIndex === -1 ? 
                    <QuizInstruction startQuiz={this.startQuiz} timerEndFunction={() => this.setState({currentPlayingSoundIndex: 0})}/>
                    :
                    <React.Fragment>
                        <nav className="quiz-navigation">
                            <Timer showPulseAnimation={false} shouldPause={isQuizPaused} label="cały czas trwania"/>
                            <div className="nav-btns-container">
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
            </div>
 
            {currentPlayingSoundIndex === -1 && 
                <Button onClick={this.exitFromQuiz} name="Wyjdź" className="white-btn medium-btn" />
            }
           
           {isQuizPaused && 
            <PausedQuizModal toglePauseState={this.toglePauseState} quizSetting={settings[quizType]} numberOfUsedPauses={numberOfUsedPauses} /> 
           }
                          
        </ErrorHoc>  
        );
    }
}

export default QuizContent;