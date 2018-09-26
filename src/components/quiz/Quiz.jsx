import React from 'react';
import './Quiz.scss';
import Button from '../UI/button/button';
import { connect } from 'react-redux';
import { getSoundsByTypeACreator, getSoundsByType } from '../../store/actions/Sounds.js';
import OperationPrompt from '../UI/operationPrompt/operationPrompt';
import QuizContent from './quizContent/quizContent';
const createStatsItems = setting => {
    if(setting === undefined)
        return [];

    const { numberOfQuestions } = setting;
    const createdStatsItems = [];
    for(let i = 0; i < numberOfQuestions; i++){
        createdStatsItems.push({ id: i, isQuestionAnswered: false, answer: "", question: "" });
    }

    return createdStatsItems;
}
const settings = {
    "sounds": {
        numberOfQuestions: 10, requestName: "sound"
    },
    "chords": {
        numberOfQuestions: 20, requestName: "chord"
    },
    "intervals": {

    },
    "mixed": {

    }
}
class Quiz extends React.PureComponent{
    state = {
        levels: createStatsItems(settings[this.props.match.params.type]),
        didUserAcceptedPrompt: false,
        soundsAreDownloading: true,
        isDownloadingSoundsAgain: false,
        isReadyToStartDownloadingSoundsNames: false
    }
    componentDidMount(){
        const { loginResult, match, history } = this.props;
        const { type } = match.params;
        if(loginResult){
            if(type !== "sounds" && type !== "chords")
                history.push("/main");
            else
                this.setState({isReadyToStartDownloadingSoundsNames: true});
        }
        else{
            if(type !== "sounds")
                history.push("/login");
            else
                this.setState({isReadyToStartDownloadingSoundsNames: true});
        }
    }
    componentDidUpdate(){
        if(this.state.isReadyToStartDownloadingSoundsNames){
            this.setState({isReadyToStartDownloadingSoundsNames: false});
            this.downloadSounds("soundsAreDownloading");
        }
    }

    downloadSounds = stateToChange => {
        const { type } = this.props.match.params;
        const { getSoundsByTypeACreator } = this.props;
        getSoundsByTypeACreator(settings[type].requestName).then(() => {
            this.setState({[stateToChange]: false});
        }).catch(() => {
            this.setState({[stateToChange]: false});
        });
    }

    downloadSoundsByTypeAgain = () => {
        this.setState({isDownloadingSoundsAgain: true}, () => { this.downloadSounds("isDownloadingSoundsAgain"); });
    }

    exitFromQuiz = () => {
        this.props.history.push("/main");
    }
    componentWillUnmount(){
        this.props.getSoundsByType([], [], null);
    }

    play = () => {
        this.player.play().then(() => {
            console.log("Siema")
        }).catch(error => {
            console.log(error);
        })
    
    }
    render(){
        const { didUserAcceptedPrompt, soundsAreDownloading, isDownloadingSoundsAgain, levels } = this.state;
        const { getSoundsErrors, sounds, getSoundsStatus } = this.props;
        
        return(
            <div className="quiz-container">
                {soundsAreDownloading && <OperationPrompt />}
                
                <QuizContent 
                downloadSoundsByTypeAgain={this.downloadSoundsByTypeAgain}
                getSoundsErrors={getSoundsErrors} 
                sounds={sounds} 
                getSoundsStatus={getSoundsStatus}
                didUserAcceptedPrompt={didUserAcceptedPrompt} 
                isDownloadingSoundsAgain={isDownloadingSoundsAgain} levels={levels} />
                
            
                <Button
                    onClick={this.exitFromQuiz}
                    name="Wyjdź"
                    className="white-btn medium-btn"
                />
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
