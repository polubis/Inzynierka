import { SEND_REGISTER_EMAIL, END_REGISTER, LOGIN } from '../actionTypes';
import annonymousInstance from '../../api/axios';
import { handleErrors } from '../utility/handleErrors';
import { getASpecyficCookieValue, setCookie, deleteCookie } from '../../services/cookiesHelper';
import axios from 'axios';
import { Api } from '../../api/index.js';

export const setTokenActionCreator = currentLoginObject => {
    return dispatch => {
        const copiedObject = {...currentLoginObject};
        console.log(copiedObject);
        const cookies = document.cookie;
        const token = getASpecyficCookieValue("token", cookies);
        copiedObject.token = token;
        dispatch(logIn(true, [], copiedObject));
    }
}

export const logoutActionCreator = history => {
    return dispatch => {
        deleteCookie("token");
        dispatch(logIn(null, [], null));
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
            const model = {...response.data.successResult};
            model.creationDate = model.creationDate.slice(0, 10) + " " + model.creationDate.slice(11, 16);
            model.modifiedDate = model.modifiedDate.slice(0, 10) + " " + model.modifiedDate.slice(11, 16);
            
            dispatch(endRegister(true, [], model));
        }).catch(error => {
            dispatch(endRegister(false, handleErrors(error), null));
        })
    }
}

export const logIn = (loginResult, loginErrors, loginObject) => {
    return {
        type: LOGIN, loginResult, loginErrors, loginObject
    }
}

export const loginActionCreator = (loginArray, history) => {
    return dispatch => {
        const loginModel = {
            "Username": loginArray[0].value,
            "Password": loginArray[1].value
        }
        console.log(Api.Authorization.login(loginModel));

        Api.Authorization.login(loginModel).then(response => {
            dispatch(logIn(true, [], response));
            setCookie("token", 1, "/", response.token);
            document.cookie = `token=${response.token}; path=/`;
            history.push("/main");
        }).catch(error => {
            dispatch(logIn(false, handleErrors(error), ""));
        })
    }
}
