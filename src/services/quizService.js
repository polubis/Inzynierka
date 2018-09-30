export const createLevels = type => {
    if(settings[type] === undefined)
        return [];

    const { numberOfQuestions } = settings[type];
    const createdStatsItems = [];
    for(let i = 0; i < numberOfQuestions; i++){
        createdStatsItems.push({ question: "" });
    }

    return createdStatsItems;
}

class QuestionModel {
    constructor(questionContent){
        this.questionContent = questionContent;
        
    }
}

class AnswerModel {
    constructor(indexOfAnswer, timeForAnswer, wasAnswerCorrect, multiplier){
        this.indexOfAnswer = indexOfAnswer;
        this.timeForAnswer = timeForAnswer;
        this.wasAnswerCorrect = wasAnswerCorrect;
        this.multiplier = multiplier;
    }
}

export const settings = {
    "sounds": {
        numberOfQuestions: 10, requestName: "sound", numberOfPauses: 2, timeForPause: 15, translation: "Dźwięki"
    },
    "chords": {
        numberOfQuestions: 20, requestName: "chord", numberOfPauses: 3, timeForPause: 20, translation: "Akordy"
    },
    "intervals": {

    },
    "mixed": {

    }
}