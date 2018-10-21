import { CREATE_RESULT } from '../actionTypes.js';
import { Api } from '../../api/index.js';
import { sliceProbeName } from '../../services/quizService';
import MockPicture from '../../assets/pictures/pic.jpg';

export const createResult = (resultData, createResultStatus, createResultErrors) => {
    return { type: CREATE_RESULT, resultData, createResultStatus, createResultErrors }
}

const mockedUsers = [
        {id: 0, username: "piotr", img: MockPicture, sex: "mężczyzna" },
        {id: 1, username: "pamela_siemanero", img: MockPicture, sex: "kobieta" },
        {id: 2, username: "jaro17", img: null, sex: "mężczyzna" },
        {id: 3, username: "jaro17", img: null, sex: "mężczyzna" },
        {id: 4, username: "jaro17", img: null, sex: "mężczyzna" },
        {id: 5, username: "jaro17", img: null, sex: "kobieta" }
    ];
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
                correctAnswers: names,
                numberOfIgnoredQuestions,
                numberInRank: 10,
                similarUsers: mockedUsers,
                decentTimeForQuiz: 15
            }
            dispatch(createResult(resultData, true, []));
            resolve();
        }).catch(errors => {
            dispatch(createResult(null, false, errors));
            reject();
        });
    })
}
