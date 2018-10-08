import React from 'react'
import './quizEndStatistics.scss';
import OperationPrompt from '../../UI/operationPrompt/operationPrompt';
import { connect } from 'react-redux';
import { createResultACreator } from '../../../store/actions/Quiz.js';
class QuizEndStatistics extends React.PureComponent{
    state = {
        isSavingQuizResult: true
    }
    componentDidMount(){
        const { createResultACreator } = this.props;
        createResultACreator().then(() => {
            this.setState({isSavingQuizResult: false});
        }).catch(() => this.setState({isSavingQuizResult: false}));
    }

    render(){
        const { isSavingQuizResult } = this.state;
        return (
            <div className="quiz-end-statistics">
                {isSavingQuizResult && <OperationPrompt positionClass="operation-prompt-tright"/>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createResultACreator: () => dispatch(createResultACreator())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEndStatistics);