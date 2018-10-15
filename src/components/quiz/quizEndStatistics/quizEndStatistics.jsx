import React from 'react'
import './quizEndStatistics.scss';
import OperationPrompt from '../../UI/operationPrompt/operationPrompt';
import { connect } from 'react-redux';
import { createResultACreator } from '../../../store/actions/Quiz.js';
import ErrorHoc from '../../../hoc/errorHoc';
class QuizEndStatistics extends React.PureComponent{
    state = {
        isSavingQuizResult: false, isSavingQuizResultAgain: false
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
        const { createResultErrors } = this.props;
        return (
            <div className="quiz-end-statistics">
                {isSavingQuizResult ? <OperationPrompt positionClass="operation-prompt-tright"/> :
                    <ErrorHoc errors={createResultErrors} isRefresingRequest={isSavingQuizResultAgain} 
                        operation={() => this.saveResults("isSavingQuizResultAgain")}>

                        <span>siema</span>
                        
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