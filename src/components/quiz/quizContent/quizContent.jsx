import React from 'react'
import './quizContent.scss';
import ErrorHoc from '../../../hoc/errorHoc';
import QuizInstruction from './quizInstruction/quizInstruction';
import Timer from '../timer/timer';
import Button from '../../UI/button/button';
import PausedQuizModal from '../../modals/pausedQuiz/pausedQuiz';
import { settings, createAnswers, translatedIndexesInWords, pathToGetSounds, randomize, sliceProbeName, soundNames } from '../../../services/quizService.js';
import MusicPlayer from '../../musicPlayer/musicPlayer';
import FormInput from '../../UI/form/formInput/formInput';
import StatsMenu from '../statsMenu/statsMenu';

class QuizContent extends React.PureComponent{
    state = {
        currentPlayingSoundIndex: -1,
        quizResult: {numberOfPositiveRates: 0, numberOfNegativeRates: 0},
        answers: [],
        isQuizPaused: false,
        numberOfUsedPauses: settings[this.props.quizType].numberOfPauses,
        isQuizFinished: false,
        functionToUseForProbeInMusicPlayer: "",
        shouldResetQuestionsTimer: false,
        sugestions: [], isBufferingSound: true,
        answerCounters: {correct: 0, negative: 0}
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
      this.setState({currentPlayingSoundIndex: 0, functionToUseForProbeInMusicPlayer: "play", 
        sugestions: this.createSugestions(4)});
    }

    createSugestions = numberOfSugestionsToTake => {
        const { sounds } = this.props;
        const { currentPlayingSoundIndex } = this.state;
        const sugestions = [];
        const answer = sounds[currentPlayingSoundIndex === -1 ? 0 : currentPlayingSoundIndex];
        const copiedSoundNames = [...soundNames];

        for(let i = 0; i < numberOfSugestionsToTake; i++){
            const randomizedIndex = randomize(copiedSoundNames.length-1, i);
            sugestions.push(copiedSoundNames[randomizedIndex]);
            copiedSoundNames.splice(randomizedIndex, 1);
        }
        const placeToPutCorrectAnswer = randomize(numberOfSugestionsToTake-1, 0);
        const probeName = sliceProbeName(answer, "_");

        const isAlreadyAnswerInArray = sugestions.findIndex(i => i === probeName);

        if(isAlreadyAnswerInArray === -1){
            sugestions.splice(placeToPutCorrectAnswer, 1, probeName);
        }
        return sugestions;
    }

    toglePauseState = () => {
       const { isQuizPaused, numberOfUsedPauses, currentPlayingSoundIndex } = this.state;
       if(isQuizPaused){
        const answers = [...this.state.answers];
        answers[currentPlayingSoundIndex].wasPaused = true;

        this.setState({isQuizPaused: false, functionToUseForProbeInMusicPlayer: "unpause", answers});
       }
       else{
        this.setState({isQuizPaused: true, numberOfUsedPauses: numberOfUsedPauses-1, functionToUseForProbeInMusicPlayer: "pause"});
       }
    }

    exitFromQuiz = () => {
        this.props.history.push("/main");
    }

    checkIsAnswerCorrect = (index, userAnswer) => {
        const { sounds } = this.props;
        return sliceProbeName(sounds[index], "_") === userAnswer;
    }

    handleAnswer = answer => {
        const answers = [...this.state.answers];
        const answerCounters = {...this.state.answerCounters};
        const { currentPlayingSoundIndex } = this.state;

        answers[currentPlayingSoundIndex].answerValue = answer;
        answers[currentPlayingSoundIndex].isAnswerCorrect = this.checkIsAnswerCorrect(currentPlayingSoundIndex, answer);
        if(answers[currentPlayingSoundIndex].isAnswerCorrect)
            answerCounters.correct = answerCounters.correct + 1;
        else
            answerCounters.negative = answerCounters.negative + 1;
        
        this.setState({answerCounters, answers, sugestions: this.createSugestions(4), shouldResetQuestionsTimer: true});
    }

    handleAnswerAutomaticly = () => {
        const { sounds, quizType } = this.props;
        const { currentPlayingSoundIndex } = this.state;
        const answers = [...this.state.answers];
        const answerCounters = {...this.state.answerCounters};
        answerCounters.negative = answerCounters.negative+1;
        answers[currentPlayingSoundIndex].answerValue = "Brak odpowiedzi";  
        answers[currentPlayingSoundIndex].isAnswerCorrect = false;
        this.setState({answerCounters, answers, shouldResetQuestionsTimer: true, sugestions: this.createSugestions(4)});
    }

    putTimeIntoAnswer = time => {
        const { answers, currentPlayingSoundIndex } = this.state;
        const copiedAnswers = [...answers];
        copiedAnswers[currentPlayingSoundIndex].timeForAnswer = time;
        this.setState({answers: copiedAnswers, currentPlayingSoundIndex: currentPlayingSoundIndex + 1});
    }

    render(){
        const { currentPlayingSoundIndex, isQuizPaused, numberOfUsedPauses, answers, 
            functionToUseForProbeInMusicPlayer, shouldResetQuestionsTimer, sugestions, answerCounters} = this.state;
        const { downloadSoundsByTypeAgain, getSoundsErrors, getSoundsStatus, sounds, didUserAcceptedPrompt, 
             isDownloadingSoundsAgain, quizType } = this.props;

        const isQuizFinished = currentPlayingSoundIndex === settings[quizType].numberOfQuestions;
        return (
            <ErrorHoc errors={getSoundsErrors} isRefresingRequest={isDownloadingSoundsAgain} operation={downloadSoundsByTypeAgain}>
                <StatsMenu answers={answers} currentPlayingSoundIndex={currentPlayingSoundIndex} getSoundsStatus={getSoundsStatus} />  
                
                <div className="quiz-content">
                    {isQuizFinished ? <div>Gratulacje udało Ci się ukończyć quiz</div>
                    :
                    <React.Fragment>
                        {currentPlayingSoundIndex === -1 ? 
                            <QuizInstruction startQuiz={this.startQuiz} />
                            :
                            <React.Fragment>
                                <nav className="quiz-navigation">
                                    <Timer accuracy={0.1} showPulseAnimation={false} shouldPause={isQuizPaused} label="cały czas trwania"/>
                                    <div className="nav-btns-container">
                                        <div className="nav-quiz-item"><div>{currentPlayingSoundIndex}/{settings[quizType].numberOfQuestions}</div><span>numer pytania</span></div>
                                        {numberOfUsedPauses > 0 && 
                                            <div className="nav-quiz-item"><div>{numberOfUsedPauses}</div><span>pozostałe pauzy</span></div>
                                        }
                                        <div className="nav-quiz-item"><div style={{color: '#7CB996'}}>{answerCounters.correct}</div><span>poprawne odpowiedzi</span></div>
                                        <div className="nav-quiz-item"><div style={{color: '#BD7B7B'}}>{answerCounters.negative}</div><span>negatywne odpowiedzi</span></div>
                                        
                                    </div>
                                </nav>
                                <section>
                                  <div className="section-content">
                                        <h2><span className="dots">Pytanie {translatedIndexesInWords[currentPlayingSoundIndex]}</span></h2>
                                        <div className="quiz-panel">
                                            <div>
                                                <Timer resetTimerFunction={this.putTimeIntoAnswer} 
                                                shouldResetTimer={shouldResetQuestionsTimer} 
                                                timerEndFunction={this.handleAnswerAutomaticly} 
                                                shouldDecrement shouldReset 
                                                startTime={settings[quizType].timeForAnswer} accuracy={0.1} showPulseAnimation={false} 
                                                shouldPause={isQuizPaused} />

                                                <p>Sugerowane odpowiedzi</p>
                                                <div className="sugestions">
                                                    {sugestions.map((sugestion, index) => (
                                                        <span onClick={() => this.handleAnswer(sugestion)} key={index}>{sugestion}</span>
                                                    ))}
                                                </div>
                                                {getSoundsStatus && 
                                                    <MusicPlayer playerState={functionToUseForProbeInMusicPlayer} musicSource={pathToGetSounds + sounds[currentPlayingSoundIndex]} />
                                                }
                                            </div>
                                          
                                        </div>                                       
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
                    </React.Fragment>
                    }
                    </div>
                    {isQuizPaused && 
                        <PausedQuizModal toglePauseState={this.toglePauseState} quizSetting={settings[quizType]} 
                        numberOfUsedPauses={numberOfUsedPauses} currentPlayingSoundIndex={currentPlayingSoundIndex} /> 
                    }
                    <Button onClick={this.exitFromQuiz} name="Wyjdź" className="white-btn medium-btn" />
        </ErrorHoc>  
        );
    }
}

export default QuizContent;