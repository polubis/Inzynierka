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
import Sugestions from '../sugestions/sugestions';
import QuizNavigation from '../../navigation/quizNavigation/quizNavigation';
import QuizEndStatistics from '../quizEndStatistics/quizEndStatistics';
import GraphTimer from '../timer/graphTimer';

class QuizContent extends React.PureComponent{
    state = {
        currentPlayingSoundIndex: -1,
        quizResult: {numberOfPositiveRates: 0, numberOfNegativeRates: 0},
        answers: [],
        isQuizPaused: false,
        numberOfUsedPauses: this.props.quizSetting.numberOfPauses,
        isQuizFinished: false,
        functionToUseForProbeInMusicPlayer: "",
        shouldResetQuestionsTimer: false,
        sugestions: [], answerCounters: {correct: 0, negative: 0}, 
        isSettingsModalOpen: false
    }

    componentDidMount(){
        const { quizSetting } = this.props;
        this.setState({answers: createAnswers(quizSetting.numberOfQuestions)});
    }

    componentDidUpdate(){
        if(this.state.shouldResetQuestionsTimer){
            this.setState({shouldResetQuestionsTimer: false});
        }
    }

    startQuiz = () => {
      const { quizSetting } = this.props;
      this.setState({currentPlayingSoundIndex: 0, functionToUseForProbeInMusicPlayer: "play"}, () => {
          this.setState({sugestions: this.createSugestions(quizSetting.numberOfStartSugestions)});
      });
    }

    createSugestions = numberOfSugestionsToTake => {
        const { currentPlayingSoundIndex } = this.state;
        const { sounds } = this.props;
        const copyOfSoundsNames = [...soundNames];
        const sugestions = [];
        for(let i = 0; i < numberOfSugestionsToTake; i++){
            const random = randomize(copyOfSoundsNames.length-1, 0);
            sugestions.push(copyOfSoundsNames[random]);
            copyOfSoundsNames.splice(random, 1);
        }

        const answer = sliceProbeName(sounds[currentPlayingSoundIndex], "_");
        const placeToPutCorrectAnswer = randomize(numberOfSugestionsToTake-1, 0);
        const isAnswerAlreadyInArray = sugestions.findIndex(i => i === answer);
        if(isAnswerAlreadyInArray === -1)
            sugestions.splice(placeToPutCorrectAnswer, 1, answer);
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
        
        this.setState({answerCounters, answers, shouldResetQuestionsTimer: true});
    }

    handleAnswerAutomaticly = () => {
        const { sounds } = this.props;
        const { currentPlayingSoundIndex } = this.state;
        const answers = [...this.state.answers];
        const answerCounters = {...this.state.answerCounters};
        answerCounters.negative = answerCounters.negative+1;
        answers[currentPlayingSoundIndex].answerValue = "Brak odpowiedzi";  
        answers[currentPlayingSoundIndex].isAnswerCorrect = false;
        this.setState({answerCounters, answers, shouldResetQuestionsTimer: true});
    }

    putTimeIntoAnswer = time => {
        const { answers, currentPlayingSoundIndex } = this.state;
        const { quizSetting } = this.props;
        const copiedAnswers = [...answers];
        copiedAnswers[currentPlayingSoundIndex].timeForAnswer = time;
        this.setState({answers: copiedAnswers, currentPlayingSoundIndex: currentPlayingSoundIndex + 1 }, () => {
            if(currentPlayingSoundIndex < quizSetting.numberOfQuestions-1)
                this.setState({sugestions: this.createSugestions(quizSetting.numberOfStartSugestions)})
        });
    }

    handleCutSugestions = () => {
        const { quizSetting } = this.props;
        const { currentPlayingSoundIndex } = this.state;
        const answers = [...this.state.answers];
        answers[currentPlayingSoundIndex].sugestionsWasRemoved = true;
        this.setState({answers, sugestions: this.createSugestions(quizSetting.numberOfStartSugestions/2)});
    }

    changeQuizSetting = () => {
        this.props.changeSettingHandler();
    }

    openSettingsModal = () => {
        this.setState({isSettingsModalOpen: true});
    }

    changeSettingsHandler = formItems => {
        this.setState({numberOfUsedPauses: formItems[0].value});
        this.props.changeSettings(formItems);
    }


    render(){
        const { currentPlayingSoundIndex, isQuizPaused, numberOfUsedPauses, answers, 
            functionToUseForProbeInMusicPlayer, shouldResetQuestionsTimer, sugestions, answerCounters, isSettingsModalOpen} = this.state;
        const { downloadSoundsByTypeAgain, getSoundsErrors, getSoundsStatus, sounds, didUserAcceptedPrompt, 
             isDownloadingSoundsAgain, quizSetting } = this.props;
             
        const isQuizFinished = currentPlayingSoundIndex === quizSetting.numberOfQuestions;
        return (
            <ErrorHoc errors={getSoundsErrors} isRefresingRequest={isDownloadingSoundsAgain} operation={downloadSoundsByTypeAgain}>
                <StatsMenu answers={answers} currentPlayingSoundIndex={currentPlayingSoundIndex} getSoundsStatus={getSoundsStatus} />  
                
                <div className="quiz-content">
                    {isQuizFinished ? <QuizEndStatistics />
                    :
                    <React.Fragment>
                        {currentPlayingSoundIndex === -1 ? 
                            <QuizInstruction changeSettings={this.changeSettingsHandler} openSettingsModal={this.openSettingsModal} isSettingsModalOpen={isSettingsModalOpen} 
                            closeSettingsModal={() => this.setState({isSettingsModalOpen: false})}
                            startQuiz={this.startQuiz} settings={quizSetting} />
                            : 
                            <React.Fragment>
                                <QuizNavigation answerCounters={answerCounters} currentPlayingSoundIndex={currentPlayingSoundIndex}
                                numberOfUsedPauses={numberOfUsedPauses} numberOfQuestions={quizSetting.numberOfQuestions}
                                accuracy={0.1} showPulseAnimation={false} shouldPause={isQuizPaused} label="cały czas trwania" />
                                <div className="footer-content-container">
                                    <div className="section-content">
                                        <h1><span className="dots">Pytanie {translatedIndexesInWords[currentPlayingSoundIndex]}</span></h1>
                                        <div className="quiz-panel">
                                            <Timer component={GraphTimer}
                                            executeOtherFunctionTime={quizSetting.sugestionsWillBeCutAfter}
                                            otherFunction={this.handleCutSugestions}
                                            resetTimerFunction={this.putTimeIntoAnswer} 
                                            shouldResetTimer={shouldResetQuestionsTimer} 
                                            timerEndFunction={this.handleAnswerAutomaticly} 
                                            shouldDecrement shouldReset showGraphTimer 
                                            startTime={quizSetting.timeForAnswer} accuracy={0.1} showPulseAnimation={false} 
                                            shouldPause={isQuizPaused} />

                                            <Sugestions handleAnswer={this.handleAnswer} sugestions={sugestions} />
                                            {getSoundsStatus && 
                                                <MusicPlayer playerState={functionToUseForProbeInMusicPlayer} musicSource={pathToGetSounds + sounds[currentPlayingSoundIndex]} />
                                            }
                                        </div>                                       
                                    </div>
                                    <footer>
                                        <div className="footer-icons">
                                            <i onClick={numberOfUsedPauses !== 0 ? this.toglePauseState : null} 
                                            className={`fa fa-${isQuizPaused ? "play" : "pause"} ${numberOfUsedPauses === 0 ? "disabled-element" : ""}`}></i>
                                        </div>
                                    </footer>
                                </div>    
                                    
                            </React.Fragment>
                        }
                    </React.Fragment>
                    }
                    </div>
                    {isQuizPaused && 
                        <PausedQuizModal toglePauseState={this.toglePauseState} quizSetting={quizSetting} 
                        numberOfUsedPauses={numberOfUsedPauses} currentPlayingSoundIndex={currentPlayingSoundIndex} /> 
                    }

                    <Button onClick={this.exitFromQuiz} name="Wyjdź" className="white-btn medium-btn" />
        </ErrorHoc>  
        );
    }
}

export default QuizContent;