import { SEND_REGISTER_EMAIL, END_REGISTER, LOGIN } from '../actionTypes';
import { updateObject } from '../utility/updateObject';


const initialState = {
    sendEmailResult: null, 
    sendEmailError: [],

    registerResult: null, 
    registerError: [],
    registerUserData: null,

    loginResult: null,
    loginErrors: [],
    loginObject: null
}
const Authenticate = (state = initialState, action) => {
    switch(action.type){
        case SEND_REGISTER_EMAIL:
            return updateObject(state, {sendEmailResult: action.sendEmailResult, 
                sendEmailError: action.sendEmailError})

        case END_REGISTER:
            return updateObject(state, {registerResult: action.registerResult, 
                registerError: action.registerError, registerUserData: action.registerUserData})
        
        case LOGIN:
            return updateObject(state, {loginResult: action.loginResult, loginErrors: action.loginErrors, 
                loginObject: action.loginObject})
        default:
            break;
    }
    return state;   
}
export default Authenticate;