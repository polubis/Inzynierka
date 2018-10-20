import { CREATE_RESULT } from '../actionTypes.js';
import { Api } from '../../api/index.js';
import { sliceProbeName } from '../../services/quizService';


export const createResult = (createResultStatus, createResultErrors) => {
    return { type: CREATE_RESULT, createResultStatus, createResultErrors }
}

export const createResultACreator = (answers, sounds, answerCounters, quizSetting) => dispatch => {
    return new Promise((resolve, reject) => {
        
        const names = sounds.map(i => {
            const isChord = i.source.search("chords") !== -1;
            let slicedName = sliceProbeName(i.name, isChord ? "." : "_");
            slicedName = isChord ? i.name.replace("_", "") : slicedName;
            if(isChord){
                slicedName = sliceProbeName(slicedName, ".");
            }
            
            return slicedName;
        });
        const questions = answers.map((i, index) => {
            return { correctAnswer: names[index], answer: i.answerValue, 
                timeForAnswerInSeconds: quizSetting.timeForAnswer - i.timeForAnswer, answeredBeforeSugestion: i.sugestionsWasRemoved ? false : true }
        });
        
        const resultModel = { "quizType": quizSetting.requestName, "numberOfPositiveRates": answerCounters.correct, 
            "numberOfNegativeRates": answerCounters.negative, "questions": questions };
        
        Api.Quiz.createResult(resultModel).then(response => {
            dispatch(createResult(true, []));
            resolve();
        }).catch(errors => {
            dispatch(createResult(false, errors));
            reject();
        });
    })
}
