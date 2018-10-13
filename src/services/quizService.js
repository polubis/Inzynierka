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
    "test": {instructionType: "standard",
        numberOfQuestions: 10, requestName: "sound", numberOfPauses: 1, numberOfStartSugestions: 10, 
            timeForPause: 15, translation: "Quiz testowy", timeForAnswer: 20, sugestionsWillBeCutAfter: 10, 
    },
    "sounds": {instructionType: "standard",
        numberOfQuestions: 10, requestName: "sound", numberOfPauses: 2, numberOfStartSugestions: 6, isRankTypeQuiz: true, 
            timeForPause: 15, translation: "Dźwięki", timeForAnswer: 10, sugestionsWillBeCutAfter: 5, 
    },
    "chords": { instructionType: "standard",
        numberOfStartSugestions: 8, numberOfQuestions: 20, requestName: "chord", numberOfPauses: 3, timeForPause: 20, isRankTypeQuiz: true,
        translation: "Akordy", timeForAnswer: 12.5, sugestionsWillBeCutAfter: 6.2
    },
    "mixed": { instructionType: "standard",
        numberOfQuestions: 25, requestName: "mixed", numberOfPauses: 4, numberOfStartSugestions: 10, timeForPause: 30, isRankTypeQuiz: true, 
            translation: "Dźwięki oraz akordy", timeForAnswer: 15, sugestionsWillBeCutAfter: 7.5 
    },
    "training": { havePermisionsToEditSettings: true, instructionType: "training",
        numberOfQuestions: 15, requestName: "mixed", numberOfPauses: 100, numberOfStartSugestions: 10, timeForPause: 120, 
            translation: "Tryb treningowy", timeForAnswer: 60, sugestionsWillBeCutAfter: 30
    }
}



export const getSettingsForType = type => {
    const copiedSettings = {...settings};
    const copiedType = {...copiedSettings[type]};
    return copiedType;    
}
export const checkQuizTypeIsCorrect = type => {
    const keys = Object.keys(settings);
    for(let key in settings){
        if(key === type)
            return true;
    }
    return false;
}


export const translatedIndexesInWords = ["Pierwsze", "Drugie", "Trzecie", "Czwarte", "Piąte", "Szóste", "Siódme", "Ósme", "Dziewiąte", 
    "Dziesiąte", "Jedynaste", "Dwunaste", "Trzynaste", "Czternaste", "Piętnaste", "Szesnaste", "Siedemnaste", 
    "Osiemnaste", "Dziewietnaste", "Dwudzieste", "Dwudzieste pierwsze", "Dwudzieste drugie", "Dwudzieste trzecie", 
    "Dwudzieste czwarte", "Dwudzieste piąte"];

export const pathToGetSounds = "http://localhost:52535/sounds/";

export const soundNames = ["A", "Ais", "B", "C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis"];

export const randomize = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sliceProbeName = (fullName, charToSlice) => {
    const indexOfChar = fullName.indexOf(charToSlice);
    return fullName.slice(0, indexOfChar);
}