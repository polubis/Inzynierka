export const createAnswers = type => {
    if(settings[type] === undefined)
        return [];

    const { numberOfQuestions } = settings[type];
    const createdStatsItems = [];
    for(let i = 0; i < numberOfQuestions; i++){
        createdStatsItems.push({id: i, timeForAnswer: 0, answerValue: null, isAnswerCorrect: null});
    }

    return createdStatsItems;
}

export const settings = {
    "sounds": {
        numberOfQuestions: 10, requestName: "sound", numberOfPauses: 2, numberOfStartSugestions: 6,
            timeForPause: 15, translation: "Dźwięki", timeForAnswer: 10, sugestionsWillBeCutAfter: 5, 
    },
    "chords": { numberOfStartSugestions: 8, numberOfQuestions: 20, requestName: "chord", numberOfPauses: 3, timeForPause: 20, 
        translation: "Akordy", timeForAnswer: 12.5, sugestionsWillBeCutAfter: 6.2
    },
    "mixed": {
        numberOfQuestions: 25, requestName: "mixed", numberOfPauses: 4, numberOfStartSugestions: 10, timeForPause: 30, 
            translation: "Dźwięki oraz akordy", timeForAnswer: 15, sugestionsWillBeCutAfter: 7.5 
    },
    "training": { havePermisionsToEditSettings: true, 
        numberOfQuestions: 15, requestName: "mixed", numberOfPauses: 100, numberOfStartSugestions: 10, timeForPause: 120, 
            translation: "Tryb treningowy", timeForAnswer: 60, sugestionsWillBeCutAfter: 30
    }
}

export const getSettingsForType = type => {
    const copiedSettings = {...settings};
    const copiedType = {...copiedSettings[type]};
    console.log(copiedType);
    return copiedType;    
}
export const checkQuizTypeIsCorrect = type => {
    const keys = Object.keys(settings);
    for(let key in settings){
        console.log(key);
        if(key === type)
            return true;
    }
    return false;
}


export const translatedIndexesInWords = ["Pierwsze", "Drugie", "Trzecie", "Czwarte", "Piąte", "Szóste", "Siódme", "Ósme", "Dziewiąte", "Dziesiąte", "Jedynaste", "Dwunaste", "Trzynaste", "Czternaste", "Piętnaste", "Szesnaste", "Siedemnaste", "Osiemnaste", "Dziewietnaste", "Dwudzieste"];

export const pathToGetSounds = "http://localhost:52535/sounds/";

export const soundNames = ["A", "Ais", "B", "C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis"];

export const randomize = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sliceProbeName = (fullName, charToSlice) => {
    const indexOfChar = fullName.indexOf(charToSlice);
    return fullName.slice(0, indexOfChar);
}