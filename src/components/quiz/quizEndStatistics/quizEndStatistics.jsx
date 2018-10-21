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
        const { createResultErrors, resultData, answers } = this.props;
        return (
            <div className="quiz-end-statistics">
                {isSavingQuizResult ? <OperationPrompt positionClass="operation-prompt-tright"/> :
                <ErrorHoc errors={createResultErrors} isRefresingRequest={isSavingQuizResultAgain} 
                    operation={() => this.saveResults("isSavingQuizResultAgain")}>
                    <h1>Statystyki rozgrywki</h1>
                    <div className="end-stats-container">
                        <div className="stats-caffel">
                            <div className="answers-ratio">
                                <span className="greeny-span">{resultData.answerCounters.correct}</span>
                                <span>/</span>
                                <span className="reddy-span">{resultData.answerCounters.negative}</span>
                            </div>
                        </div>
                        <div className="stats-caffel">
                            <div className="timers-ratio">
                                <div>
                                    <i className="fa fa-clock-o"/>
                                    <article>
                                        <p>Twój czasowy rezultat jest bliski aktualnej średniej</p>
                                        <p>Uzyskany wynik czasowy: <b>{resultData.sumTime} s</b></p>
                                        <p>Aktualna średnia czasowa: <b>{resultData.decentTimeForQuiz} s</b></p>
                                    </article>
                                </div>
                                <div className="time-line-container">
                                    <div>
                                        {resultData.timesForAnswer.map((time, index) => (
                                            <span key={index} className={answers[index].isAnswerCorrect ? "greeny" : "reddy"}>
                                                <b>{answers[index].answerValue}</b>
                                                <b>{time} s</b>
                                                {answers[index].isAnswerCorrect || 
                                                    <b>
                                                        {resultData.correctAnswers[index]}
                                                    </b>
                                                }
                                            </span>
                                        ))}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="stats-caffel">
                            <div className="answers-ratio">
                                <span className="yellow-span">{resultData.numberOfIgnoredQuestions}</span>
                                <span>/</span>
                                <span className="count-all-span">{resultData.limit}</span>
                            </div>
                        </div>

                        <div className="stats-caffel">
                            <p className="abs-paragraph">Pozycja w rankingu</p>
                            <div className="place-in-rank">{resultData.numberInRank}</div>
                        </div>

                        <div className="users-with-similar-rates">
                            <p>Użytkownicy z podobnym wynikiem</p> 
                            <div className="users-carts">
                                {resultData.similarUsers.map(user => (
                                    <div key={user.id} className="user-cart">
                                        <div className="avatar">
                                            <div style={{backgroundImage: `url(${user.img})`}} />
                                            <div className="user-icon">
                                                <i className={`fa fa-${user.sex === "mężczyzna" ? "male" : "female"}`}></i>
                                            </div>
                                        </div>
                                        <div className="username">
                                            {user.username}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="stats-caffel column-caffel">
                            <h3>Statystyki ogólne</h3>
                            <div>
                                <p><i className="fa fa-gamepad"/><span>Liczba rozegranych gier: </span><b>64</b></p>
                                <p><i className="fa fa-trophy"/><span>Aktualne punkty: </span><b>10</b></p>
                                <p className="greeny-font">Rozgrywka przeprowadzona zgodnie z zasadami</p>
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
        createResultErrors: state.Quiz.createResultErrors,
        resultData: state.Quiz.resultData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createResultACreator: (answers, sounds, answerCounters, quizSetting) => dispatch(createResultACreator(answers, sounds, answerCounters, quizSetting))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEndStatistics);