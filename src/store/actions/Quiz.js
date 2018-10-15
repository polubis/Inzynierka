import { CREATE_RESULT } from '../actionTypes.js';
import { Api } from '../../api/index.js';
import { sliceProbeName } from '../../services/quizService';


export const createResult = (createResultStatus, createResultErrors) => {
    return { type: CREATE_RESULT, createResultStatus, createResultErrors }
}

export const createResultACreator = (answers, sounds, answerCounters, quizSetting) => dispatch => {
    return new Promise((resolve, reject) => {
        const soundNames = sounds.map(i => sliceProbeName(i, "_"));

        const questions = answers.map((i, index) => {
            return { correctAnswer: soundNames[index], answer: i.answerValue, 
                timeForAnswerInSeconds: i.timeForAnswer, answeredBeforeSugestion: i.sugestionsWasRemoved ? false : true,
                calculatedPoints: 120 }
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
