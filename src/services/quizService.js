export const createAnswers = type => {
    if(settings[type] === undefined)
        return [];

    const { numberOfQuestions, timeForAnswer, sugestionsWillShowAfter } = settings[type];
    const createdStatsItems = [];
    for(let i = 0; i < numberOfQuestions; i++){
        createdStatsItems.push({id: i, timeForAnswer: timeForAnswer, answerValue: null, sugestionsWillShowAfter: sugestionsWillShowAfter});
    }

    return createdStatsItems;
}

export const settings = {
    "sounds": {
        numberOfQuestions: 10, requestName: "sound", numberOfPauses: 2, timeForPause: 15, translation: "Dźwięki", timeForAnswer: 10, sugestionsWillShowAfter: 5
    },
    "chords": {
        numberOfQuestions: 20, requestName: "chord", numberOfPauses: 3, timeForPause: 20, translation: "Akordy", timeForAnswer: 12.5, sugestionsWillShowAfter: 8
    },
    "intervals": {

    },
    "mixed": {

    }
}

export const translatedIndexesInWords = ["Pierwsze", "Drugie", "Trzecie", "Czwarte", "Piąte", "Szóste", "Siódme", "Ósme", "Dziewiąte", "Dziesiąte", "Jedynaste", "Dwunaste", "Trzynaste", "Czternaste", "Piętnaste", "Szesnaste", "Siedemnaste", "Osiemnaste", "Dziewietnaste", "Dwudzieste"];

export const pathToGetSounds = "http://localhost:52535/sounds/";
