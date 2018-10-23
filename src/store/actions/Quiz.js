import { CREATE_RESULT } from '../actionTypes.js';
import { Api } from '../../api/index.js';
import { sliceProbeName } from '../../services/quizService';
import MockPicture from '../../assets/pictures/pic.jpg';

export const createResult = (resultData, createResultStatus, createResultErrors) => {
    return { type: CREATE_RESULT, resultData, createResultStatus, createResultErrors }
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
                timeForAnswerInSeconds: i.answerValue === "Brak odpowiedzi" ? quizSetting.timeForAnswer :
                    quizSetting.timeForAnswer - i.timeForAnswer, 
                answeredBeforeSugestion: i.sugestionsWasRemoved ? false : true }
        });

        const resultModel = { "quizType": quizSetting.requestName, "numberOfPositiveRates": answerCounters.correct, 
            "numberOfNegativeRates": answerCounters.negative, "questions": questions };

        Api.Quiz.createResult(resultModel).then(response => {
            let sumTime = 0;
            let numberOfIgnoredQuestions = 0;
            questions.forEach(function(part){
                sumTime += part.timeForAnswerInSeconds;
            });
            answers.forEach(function(part){
                numberOfIgnoredQuestions += part.answerValue === "Brak odpowiedzi" ? 1 : 0;
            });

            const resultData = {
                answerCounters: {...answerCounters}, 
                timesForAnswer: questions.map(question => question.answerValue === "Brak odpowiedzi" ? quizSetting.timeForAnswer : 
                    question.timeForAnswerInSeconds.toFixed(1)),
                limit: quizSetting.numberOfQuestions,
                sumTime: sumTime.toFixed(1),
                actualPoints: response.actualPoints,
                correctAnswers: names,
                numberOfIgnoredQuestions,
                numberInRank: response.placeInRank,
                similarUsers: response.similarUsers,
                decentTimeForQuiz: response.timeAverage,
                numberOfPlayedGames: response.numberOfPlayedGames,
                effectiveness: response.effectiveness,
                percentageRatio: answerCounters.correct === 0 ? 0 : ((answerCounters.correct / quizSetting.numberOfQuestions) * 100),
                timeRatioMessage: checkIsTimeRatioNearAverage(sumTime, response.timeAverage),
                numberOfAllPositiveAnswers: response.numberOfAllPositiveAnswers,
                numberOfAllNegativeAnswers: response.numberOfAllNegativeAnswers
            }
            dispatch(createResult(resultData, true, []));
            resolve();
        }).catch(errors => {
            dispatch(createResult(null, false, errors));
            reject();
        });
    })
}

const checkIsTimeRatioNearAverage = (time, averageTime) => {
    if(time < averageTime)
        return "Uzyskany wynik czasowy jest lepszy od średniej";
    if(time === averageTime)
        return "Uzyskany wynik czasowy jest równy średniej";
    if(time > averageTime){
        return "Uzyskany wynik czasowy jest gorszy od średniej";
    }
}
