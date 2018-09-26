import React from 'react';
import './Quiz.scss';
import Button from '../UI/button/button';
import { connect } from 'react-redux';
import { getSoundsByTypeACreator, getSoundsByType } from '../../store/actions/Sounds.js';
import ErrorHoc from '../../hoc/errorHoc';
import { extractFilesFromZip } from '../../services/fileService.js';
import OperationPrompt from '../UI/operationPrompt/operationPrompt';
import Sound from '../../assets/testSounds/gtr-nylon22.mp3';
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
        quizResult: {numberOfPositiveRates: 0, numberOfNegativeRates: 0},
        filesWasDecompresedBefore: false,
        decompresedSounds: [],
        isReadyToStartDownloadingSounds: false,
        currentPlayingSoundIndex: 0
    }
    componentDidMount(){
        const { loginResult, match, history } = this.props;
        const { type } = match.params;
        if(loginResult){
            if(type !== "sounds" && type !== "chords")
                history.push("/main");
            else
                this.setState({isReadyToStartDownloadingSounds: true});
        }
        else{
            if(type !== "sounds")
                history.push("/login");
            else
                this.setState({isReadyToStartDownloadingSounds: true});
        }
    }
    componentDidUpdate(){
        if(this.state.isReadyToStartDownloadingSounds){
            this.setState({isReadyToStartDownloadingSounds: false});
            this.downloadSounds("soundsAreDownloading");
        }
        if(this.props.getSoundsStatus && !this.state.filesWasDecompresedBefore){
            const { sounds, getSoundsByType } = this.props;
            extractFilesFromZip(sounds).then(extractedFiles => {
                console.log(extractedFiles);
                this.setState({ decompresedSounds: extractedFiles, filesWasDecompresedBefore: true });
            });
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
    // Wyzerowac dodane dzwieki
    render(){
        const { didUserAcceptedPrompt, soundsAreDownloading, isDownloadingSoundsAgain, levels, filesWasDecompresedBefore,
            decompresedSounds, currentPlayingSoundIndex } = this.state;
        const { getSoundsErrors } = this.props;
        return(
            <div className="quiz-container">
                {soundsAreDownloading && <OperationPrompt />}
                
                <ErrorHoc errors={getSoundsErrors} isRefresingRequest={isDownloadingSoundsAgain} 
                    operation={this.downloadSoundsByTypeAgain}>
                        <aside className="side-stats-menu">
                            <ul className={filesWasDecompresedBefore ? "enable-result-list-animation" : ""}>
                                {decompresedSounds.map(sound => (
                                    <li key={sound.name}>{sound.name}</li>
                                ))}
                            </ul>
                        </aside>
                        <section>
                            {filesWasDecompresedBefore && 
                                <div className="ready-to-play-prompt"></div>
                            }
                        </section>
                        
                        {decompresedSounds.length > 0 && 
                        <audio controls autoPlay 
                        src="C:\Users\apolubinski\Desktop\Backend Inzynierka\Inzynierka.API\wwwroot\sounds\Fis_sound_3" type="audio/mpeg">
                        </audio>
                        }
                        
                </ErrorHoc>    
            
                <Button
                    onClick={this.exitFromQuiz}
                    name="Wyjdź"
                    className="white-btn medium-btn"
                />
            </div>
        );
    }
}

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
