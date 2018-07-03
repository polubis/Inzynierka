export const loginTypes = [
    {title: "Nazwa użytkownika", type: "text", holder: "wpisz swoją nazwę użytkownika..."}, 
    {title: "Hasło", type: "password", holder: "wpisz swoje hasło..."}
];
export const loginRequirements = [
    {inputName: "Login", nullable: false, minLength: 5, maxLength: 30},
    {inputName: "Hasło", nullable: false, minLength: 5, maxLength: 20}
];

export const registerTypes = [
    {title: "Nazwa użytkownika", holder: "...wpisz swoją nazwę użytkownika"}, 
    {title: "Adres email", type: "email", holder: "...wpisz swój adres email"},
    {title: "Hasło", type: "password", holder: "...wpisz swoje hasło"}, 
    {title: "Powtórzone hasło", type: "password", holder: "...wpisz swoje powtórzone hasło"}
];

export const registerRequirements = [
    
];
