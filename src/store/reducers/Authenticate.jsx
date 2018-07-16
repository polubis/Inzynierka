import { SEND_REGISTER_EMAIL, END_REGISTER, LOGIN, SET_TOKEN, CLEAR_THE_DATA } from '../actionTypes';
import { updateObject } from '../utility/updateObject';


const initialState = {
    sendEmailResult: null, 
    sendEmailError: [],

    registerResult: null, 
    registerError: [],
    registerUserData: null,

    loginResult: null,
    loginErrors: [],
    token: ""
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case SEND_REGISTER_EMAIL:
            return updateObject(state, {sendEmailResult: action.sendEmailResult, 
                sendEmailError: action.sendEmailError})

        case END_REGISTER:
            return updateObject(state, {registerResult: action.registerResult, 
                registerError: action.registerError, registerUserData: action.registerUserData})
        
        case LOGIN:
            return updateObject(state, {loginResult: action.loginResult, loginErrors: action.loginErrors, 
                token: action.token})
        case SET_TOKEN:
            return updateObject(state, { token: action.token, loginResult: action.loginResult })

        case CLEAR_THE_DATA:
            return updateObject(state, { loginResult: action.loginResult, loginErrors: action.loginErrors })
        default:
        
        break;
    }
    return state;   
}
export default reducer;