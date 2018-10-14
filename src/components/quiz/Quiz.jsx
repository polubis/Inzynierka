import React from 'react';
import './Quiz.scss';
import Button from '../UI/button/button';
import { connect } from 'react-redux';
import { getSoundsByTypeACreator, getSoundsByType } from '../../store/actions/Sounds.js';
import OperationPrompt from '../UI/operationPrompt/operationPrompt';
import QuizContent from './quizContent/quizContent';
import { getSettingsForType, checkQuizTypeIsCorrect } from '../../services/quizService.js';
class Quiz extends React.PureComponent{
    state = {
        didUserAcceptedPrompt: false,
        soundsAreDownloading: true,
        isDownloadingSoundsAgain: false,
        isReadyToStartDownloadingSoundsNames: false,
        quizSetting: null
    }
    componentDidMount(){
        const { loginResult, match, history } = this.props;
        const { type } = match.params;
        if(loginResult && !checkQuizTypeIsCorrect(type)){
            history.push("/main");
        }
        else if(!loginResult && type !== "training"){
            history.push("/login");
        }
        this.setState({isReadyToStartDownloadingSoundsNames: true, quizSetting: getSettingsForType(type)});
        
    }
    componentDidUpdate(){
        if(this.state.isReadyToStartDownloadingSoundsNames){
            this.setState({isReadyToStartDownloadingSoundsNames: false});
            this.downloadSounds("soundsAreDownloading");
        }
    }

    downloadSounds = stateToChange => {
        const { quizSetting } = this.state;
        const { getSoundsByTypeACreator } = this.props;
        getSoundsByTypeACreator(quizSetting.requestName).then(() => {
            this.setState({[stateToChange]: false});
        }).catch(() => {
            this.setState({[stateToChange]: false});
        });
    }

    downloadSoundsByTypeAgain = () => {
        this.setState({isDownloadingSoundsAgain: true}, () => { this.downloadSounds("isDownloadingSoundsAgain"); });
    }
  
    componentWillUnmount(){
        this.props.getSoundsByType([], [], null);
    }

    changeSettingHandler = settingsFormData => {
        const quizSetting = {...this.state.quizSetting};
        
        for(let key in settingsFormData){
            quizSetting[settingsFormData[key].recognizeKey] = Number(settingsFormData[key].value);
        }
        
        this.setState({quizSetting});
    }

    render(){
        const { didUserAcceptedPrompt, soundsAreDownloading, isDownloadingSoundsAgain, quizSetting } = this.state;
        const { getSoundsErrors, sounds, getSoundsStatus, history, match } = this.props;
        const { type: quizType } = match.params;
        return(
            <div className="quiz-container">
                {soundsAreDownloading ? <OperationPrompt /> : 
                    quizSetting !== null &&
                    <QuizContent
                    changeSettings={this.changeSettingHandler}
                    quizSetting={quizSetting}
                    downloadSoundsByTypeAgain={this.downloadSoundsByTypeAgain}
                    getSoundsErrors={getSoundsErrors} 
                    sounds={sounds} quizType={quizType}
                    history={history}
                    getSoundsStatus={getSoundsStatus}
                    didUserAcceptedPrompt={didUserAcceptedPrompt} 
                    isDownloadingSoundsAgain={isDownloadingSoundsAgain} />
                }
            </div>
        );
    }
}
{/* <img src="http://localhost:52535/pictures/avatars/2_download.jpg" /> */}

const mapStateToProps = state => {
    return {
        sounds: state.Sounds.sounds,
        getSoundsErrors: state.Sounds.getSoundsErrors,
        getSoundsStatus: state.Sounds.getSoundsStatus,
        loginResult: state.Authenticate.loginResult
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSoundsByTypeACreator: (type) => dispatch(getSoundsByTypeACreator(type)),
        getSoundsByType: (sounds, errors, status) => dispatch(getSoundsByType(sounds, errors, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
