import { CLEAR_THE_DATA, SET_TOKEN, SEND_REGISTER_EMAIL, END_REGISTER, LOGIN } from '../actionTypes';
import annonymousInstance from '../../api/axios';
import { handleErrors } from '../utility/handleErrors';
import { getASpecyficCookieValue, setCookie, deleteCookie } from '../../services/cookiesHelper';
import axios from 'axios';

export const setToken = (token, loginResult) => {
    return {
        type: SET_TOKEN,
        token: token,
        loginResult: loginResult
    }
}

export const setTokenActionCreator = () => {
    return dispatch => {
        const cookies = document.cookie;
        const token = getASpecyficCookieValue("token", cookies);

        dispatch(setToken(token, token !== "" ? true : false));
    }
}
export const logoutActionCreator = history => {
    return dispatch => {
        deleteCookie("token");
        dispatch(setToken("", null));
        history.push("/");
    }
}

export const sendRegisterEmail = (sendEmailResult, sendEmailError) => {
    return {
        type: SEND_REGISTER_EMAIL,
        sendEmailResult: sendEmailResult,
        sendEmailError: sendEmailError
    };
}
export const sendRegisterEmailActionCreator = (firstArray, secondArray) => {
    return dispatch => {
        const registerModel = {
            "Username": firstArray[0].value,
            "Email": firstArray[1].value,
            "Password": firstArray[2].value,
            "FirstName": secondArray[0].value === "" ? null : secondArray[0].value,
            "LastName": secondArray[1].value === "" ? null : secondArray[1].value,
            "BirthDate": secondArray[2].value === "" ? null : secondArray[2].value,
            "Sex": secondArray[3].value === "wybierz pole" ? null : 
                secondArray[3].value === "Kobieta" ? false : true
        }
        annonymousInstance.post('/users/register', registerModel).then(response => {
            dispatch(sendRegisterEmail(true, ""));
        }).catch(error => {
            dispatch(sendRegisterEmail(false, handleErrors(error)));
        })
    }
}

export const endRegister = (registerResult, registerError, registerUserData) => {
    return {
        type: END_REGISTER,
        registerResult,
        registerError,
        registerUserData
    }
}

export const endRegisterActionCreator = currentUrl => {
    return dispatch => {
        const indexOfLastSlash = currentUrl.lastIndexOf("/");
        const activateAccountLink = currentUrl.slice(indexOfLastSlash+1, currentUrl.length);
        
        annonymousInstance.post('/Users/register/activate/' + activateAccountLink).
        then(response => {
            dispatch(endRegister(true, [], response.data.successResult));
        }).catch(error => {
            dispatch(endRegister(false, handleErrors(error), null));
        })
    }
}

export const logIn = (loginResult, loginErrors, token) => {
    return {
        type: LOGIN,
        loginResult: loginResult,
        loginErrors: loginErrors,
        token: token
    }
}

export const loginActionCreator = (loginArray, history) => {
    return dispatch => {
        const loginModel = {
            "Username": loginArray[0].value,
            "Password": loginArray[1].value
        }
        annonymousInstance.post("/users/login/", loginModel).then(response => {
            dispatch(logIn(true, [], response.data.successResult.token));
            setCookie("token", 1, "/", response.data.successResult.token);
            document.cookie = `token=${response.data.successResult.token}; path=/`;
            history.push("/logged");
        }).catch(error => {
            dispatch(logIn(false, handleErrors(error), ""));
        })
    }
}

export const clearTheData = ({ ...content }) => {
    return { type: CLEAR_THE_DATA, ...content }
}

