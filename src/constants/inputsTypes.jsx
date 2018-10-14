export const loginTypes = [
    {title: "Nazwa użytkownika", type: "text", holder: "wpisz swoją nazwę użytkownika...", serverName: "Username"}, 
    {title: "Hasło", type: "password", holder: "wpisz swoje hasło...", serverName: "Password"}
];
export const loginRequirements = [
    {inputName: "Login", nullable: false, minLength: 5, maxLength: 30},
    {inputName: "Hasło", nullable: false, minLength: 5, maxLength: 20}
];

export const registerTypes = [
    {title: "Nazwa użytkownika", holder: "wpisz swoją nazwę użytkownika...", serverName: "Username"}, 
    {title: "Adres email", type: "email", holder: "wpisz swój adres email...", serverName: "Email"},
    {title: "Hasło", type: "password", holder: "wpisz swoje hasło...", serverName: "Password"}, 
    {title: "Powtórzone hasło", type: "password", holder: "wpisz swoje powtórzone hasło...", serverName: "Password"}
];

export const registerRequirements = [
    {inputName: "Login", nullable: false, minLength: 5, maxLength: 30},
    {inputName: "Adres email", nullable: false, minLength: 7, maxLength: 30},
    {inputName: "Hasło", nullable: false, minLength: 5, maxLength: 20},
    {inputName: "Hasło", nullable: false, minLength: 5, maxLength: 20}
];

export const registerDetailsTypes = [
    {title: "Imię", holder: "wpisz swoją nazwę użytkownika...", serverName: "FirstName"}, 
    {title: "Nazwisko", holder: "wpisz swoje nazwisko...", serverName: "LastName"},
    {title: "Data urodzenia", type: "date", holder: "wybierz swoją date urodzenia...", serverName: "BirthDate"}, 
    {title: "Płeć", type: "select", serverName: "Sex", selectItems: [{label: "kliknij, aby rozwinąć", value: ""}, 
    {label: "Kobieta", value: "Kobieta"}, {label: "Mężczyzna", value: "Mężczyzna"}]}
];

export const registerDetailsRequirements = [
    {inputName: "Imię", nullable: true, minLength: 3, maxLength: 40},
    {inputName: "Nazwisko", nullable: true, minLength: 2, maxLength: 50},
    {inputName: "Data urodzenia", nullable: true},
    {inputName: "Sex", nullable: true}
];

export const quizSettingsTypes = [
    {title: "Liczba dozwolnych przerw", serverName: "numberOfPauses", type: "number", min: "2", max: "300"},
    {title: "Czas pojedyńczej przerwy (w sekundach)", serverName: "timeForPause", type: "number", min: "15", max: "150"}, 
    {title: "Liczba startowych podpowiedzi", serverName: "numberOfStartSugestions", type: "number", type: "number", min: "4", max: "12"},
    {title: "Moment zabrania podpowiedzi", serverName: "sugestionsWillBeCutAfter", type: "number", step: "0.1", min: "3.5" },
    {title: "Czas na odpowiedź (w sekundach)", serverName: "timeForAnswer", type: "number", min: "7", max: "10000"},
];

export const quizSettingsRequirements = [
    {inputName: "Liczba dozwolnych przerw"},
    {inputName: "Czas pojedyńczej przerwy"},
    {inputName: "Liczba startowych podpowiedzi"},
    {inputName: "Moment zabrania podpowiedzi"},
    {inputName: "Czas na odpowiedź"}
];
