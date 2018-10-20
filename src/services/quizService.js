export const createAnswers = numberOfQuestions => {
    const createdStatsItems = [];
    for(let i = 0; i < numberOfQuestions; i++){
        createdStatsItems.push({id: i, timeForAnswer: 0, answerValue: null, isAnswerCorrect: null});
    }

    return createdStatsItems;
}

export const translatedIndexesInWords = ["Pierwsze", "Drugie", "Trzecie", "Czwarte", "Piąte", "Szóste", "Siódme", "Ósme", "Dziewiąte", 
"Dziesiąte", "Jedynaste", "Dwunaste", "Trzynaste", "Czternaste", "Piętnaste", "Szesnaste", "Siedemnaste", 
"Osiemnaste", "Dziewietnaste", "Dwudzieste", "Dwudzieste pierwsze", "Dwudzieste drugie", "Dwudzieste trzecie", 
"Dwudzieste czwarte", "Dwudzieste piąte"];

export const pathToGetSounds = "http://localhost:52535/sounds/";
export const pathToGetChords = "http://localhost:52535/chords/";
export const soundNames = ["A", "B", "C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "H"];
export const chordNames = ["Adur", "amoll", "A7dur", "a7moll", "Bdur", "bmoll", "B7moll", "b7moll", "Cdur", "cmoll", "C7dur", "c7moll", 
"CisDur", "cismoll", "Cis7dur", "cis7moll", "Ddur", "dmoll", "D7dur", "d7moll", "Disdur", "dismoll", "Dis7dur", "dis7moll", 
"Edur", "emoll", "E7dur", "e7moll", "Fdur", "fmoll", "F7dur", "f7moll", "Fisdur", "fismoll", "Fis7dur", "fis7moll", 
"Gdur", "gmoll", "G7dur", "g7moll", "Gisdur", "gismoll", "Gis7dur", "gis7moll", "Hdur", "hmoll", "h7dur", "h7moll"];
export const soundsAndChords = soundNames.concat(chordNames);

export const settings = {
    "test": {instructionType: "standard", sugestionsArray: soundNames,
        numberOfQuestions: 10, requestName: "sound", numberOfPauses: 1, numberOfStartSugestions: 10, 
            timeForPause: 15, translation: "Quiz testowy", timeForAnswer: 20, sugestionsWillBeCutAfter: 10, 
    },
    "sounds": {instructionType: "standard", sugestionsArray: soundNames,
        numberOfQuestions: 10, requestName: "sound", numberOfPauses: 2, numberOfStartSugestions: 6, isRankTypeQuiz: true, 
            timeForPause: 15, translation: "Dźwięki", timeForAnswer: 10, sugestionsWillBeCutAfter: 5, 
    },
    "chords": { instructionType: "standard", sugestionsArray: chordNames,
        numberOfStartSugestions: 8, numberOfQuestions: 20, requestName: "chord", numberOfPauses: 3, timeForPause: 20, isRankTypeQuiz: true,
        translation: "Akordy", timeForAnswer: 12.5, sugestionsWillBeCutAfter: 6.2
    },
    "mixed": { instructionType: "standard", sugestionsArray: soundsAndChords,
        numberOfQuestions: 25, requestName: "mixed", numberOfPauses: 4, numberOfStartSugestions: 10, timeForPause: 30, isRankTypeQuiz: true, 
            translation: "Dźwięki oraz akordy", timeForAnswer: 15, sugestionsWillBeCutAfter: 7.5 
    },
    "training": { havePermisionsToEditSettings: true, instructionType: "training", sugestionsArray: soundsAndChords,
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


export const defineMusicSource = probes => {
    const probesWithPath = probes.map(i => {
        return { name: i, source: returnSource(i) };
    });
    return probesWithPath;
}

const returnSource = name => {
    const isNameContainsDur = name.search("dur") !== -1;
    const isNameContainsMoll = name.search("moll") !== -1;

    return (isNameContainsDur || isNameContainsMoll) ? pathToGetChords : pathToGetSounds;
}

export const randomize = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sliceProbeName = (fullName, charToSlice) => {
    const indexOfChar = fullName.indexOf(charToSlice);
    return fullName.slice(0, indexOfChar);
}
