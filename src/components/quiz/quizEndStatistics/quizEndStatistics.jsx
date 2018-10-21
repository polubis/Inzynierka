import React from 'react'
import './quizEndStatistics.scss';
import OperationPrompt from '../../UI/operationPrompt/operationPrompt';
import { connect } from 'react-redux';
import { createResultACreator } from '../../../store/actions/Quiz.js';
import ErrorHoc from '../../../hoc/errorHoc';
class QuizEndStatistics extends React.PureComponent{
    state = {
        isSavingQuizResult: true, isSavingQuizResultAgain: false
    }
    componentDidMount(){
        this.saveResults("isSavingQuizResult");
    }

    saveResults = stateItem => {
        this.setState({[stateItem]: true});
        const { createResultACreator, answers, sounds, answerCounters, quizSetting } = this.props;
        createResultACreator(answers, sounds, answerCounters, quizSetting).then(() => {
            this.setState({[stateItem]: false});
        }).catch(() => this.setState({[stateItem]: false}));
    }

    render(){
        const { isSavingQuizResult, isSavingQuizResultAgain } = this.state;
        const { createResultErrors, answers } = this.props;
        return (
            <div className="quiz-end-statistics">
                {isSavingQuizResult ? <OperationPrompt positionClass="operation-prompt-tright"/> :
                    <ErrorHoc errors={createResultErrors} isRefresingRequest={isSavingQuizResultAgain} 
                        operation={() => this.saveResults("isSavingQuizResultAgain")}>
                        <h1>Statystyki rozgrywki</h1>
                        <div className="end-stats-container">
                            <div className="stats-caffel">
                                <div className="answers-ratio">
                                    <span>4</span>
                                    <span>/</span>
                                    <span>6</span>
                                </div>
                            </div>
                            <div className="stats-caffel">
                                <div className="timers-ratio">
                                    <div>
                                        <i className="fa fa-clock-o"/>
                                        <article>
                                            <p>Twój czasowy rezultat jest bliski aktualnej średniej</p>
                                            <p>Uzyskany wynik czasowy: <b>14.3 s</b></p>
                                            <p>Aktualna średnia czasowa: <b>15.5 s</b></p>
                                        </article>
                                    </div>
                                    <div className="time-line-container">
                                        <div>
                                            {answers.map((answer, index) => (
                                                <span key={index} className={answer.isAnswerCorrect ? "greeny" : "reddy"}>
                                                    <b>{answer.answerValue}</b>
                                                    <b>{answer.timeForAnswer}</b>
                                                </span>
                                            ))}
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>

                    </ErrorHoc>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        createResultStatus: state.Quiz.createResultStatus,
        createResultErrors: state.Quiz.createResultErrors
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createResultACreator: (answers, sounds, answerCounters, quizSetting) => dispatch(createResultACreator(answers, sounds, answerCounters, quizSetting))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEndStatistics);