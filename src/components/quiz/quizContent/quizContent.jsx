import React from 'react'
import './quizContent.scss';
import ErrorHoc from '../../../hoc/errorHoc';
import QuizInstruction from './quizInstruction/quizInstruction';
import Timer from '../timer/timer';
class AnswerModel {
    constructor(timeForAnswer, wasAnswerCorrect, multiplier){
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
        isQuizStopped: false,
        isQuizStarted: false
    }

    startQuiz = () => {
      this.setState({currentPlayingSoundIndex: 0});   
    }

    stopQuiz = () => {
        this.setState({isQuizStopped: false});
    }

    unStopQuiz = () => {
        this.setState({isQuizStopped: true});
    }

    render(){
        const { currentPlayingSoundIndex } = this.state;
        const { downloadSoundsByTypeAgain, getSoundsErrors, sounds, getSoundsStatus, didUserAcceptedPrompt, 
             isDownloadingSoundsAgain, levels } = this.props;
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
            {currentPlayingSoundIndex === -1 ? 
                <div className="quiz-content">
                    <QuizInstruction startQuiz={this.startQuiz} timerEndFunction={() => this.setState({currentPlayingSoundIndex: 0})}/>
                </div>
                :
                <React.Fragment>
                    <nav className="quiz-navigation">
                        <Timer />
                    </nav>
                    <section>
                                
                    </section>
                        
                    {getSoundsStatus && 
                        <audio src="http://localhost:52535/sounds/G_sound_3.mp3" ref={el => { this.player = el; }} type="audio/ogg">
                        </audio>
                    }
                </React.Fragment>
            }
        </ErrorHoc>  
        );
    }
}

export default QuizContent;