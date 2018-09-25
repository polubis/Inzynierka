import React from 'react';
import './Quiz.scss';
import Button from '../UI/button/button';
import { connect } from 'react-redux';
import { getSoundsByTypeACreator, getSoundsByType } from '../../store/actions/Sounds.js';
import ErrorHoc from '../../hoc/errorHoc';
import { extractFilesFromZip } from '../../services/fileService.js';
import OperationPrompt from '../UI/operationPrompt/operationPrompt';
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
    "basic": {
        numberOfQuestions: 10, requestName: "sound"
    },
    "advanced": {
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
        soundIsDownloading: true,
        isDownloadingSoundsAgain: false,
        quizResult: {numberOfPositiveRates: 0, numberOfNegativeRates: 0},
        filesWasDecompresedBefore: false,
        decompresedSounds: []
    }
    componentDidMount(){
        const { type } = this.props.match.params;
        if(type === "basic" || type === "advanced")
            this.downloadSounds("soundIsDownloading");
        else{
            this.props.history.push("/main");
        }
    }
    // Zabezpieczyc jakos ten durny request co powoduje podwoje sciagniecie danych
    componentDidUpdate(){
        if(this.props.getSoundsStatus && !this.state.filesWasDecompresedBefore){
            const { sounds, getSoundsByType } = this.props;
            extractFilesFromZip(sounds).then(extractedFiles => {
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
        const { getSoundsByType, history } = this.props;
        getSoundsByType([], [], null);
        history.push("/main");
    }

    render(){
        const { didUserAcceptedPrompt, soundIsDownloading, isDownloadingSoundsAgain, levels, filesWasDecompresedBefore,
            decompresedSounds } = this.state;
        const { getSoundsErrors } = this.props;
        return(
            <div className="quiz-container">
                {(soundIsDownloading ) && <OperationPrompt />}
                
                <ErrorHoc errors={getSoundsErrors} isRefresingRequest={isDownloadingSoundsAgain} 
                    operation={this.downloadSoundsByTypeAgain}>
                        <aside className="side-stats-menu">
                            <ul className={filesWasDecompresedBefore && "enable-result-list-animation"}>
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
        getSoundsStatus: state.Sounds.getSoundsStatus
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSoundsByTypeACreator: (type) => dispatch(getSoundsByTypeACreator(type)),
        getSoundsByType: (sounds, errors, status) => dispatch(getSoundsByType(sounds, errors, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
