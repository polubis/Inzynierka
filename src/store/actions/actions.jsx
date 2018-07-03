import * as actionTypes from '../actionTypes';
import annonymousInstance from '../../api/axios';
import { handleErrors } from '../utility/handleErrors';
import { getASpecyficCookieValue, setCookie, deleteCookie } from '../../services/cookiesHelper';
import axios from 'axios';
export const setToken = (token, loginResult) => {
    return {
        type: actionTypes.SET_TOKEN,
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

export const sendRegisterEmail = (sendEmailResult, sendEmailError, activateLink) => {
    return {
        type: actionTypes.SEND_REGISTER_EMAIL,
        sendEmailResult: sendEmailResult,
        sendEmailError: sendEmailError
    };
}
export const sendRegisterEmailActionCreator = registerCoreItems => {
    return dispatch => {
        const registerModel = {
            Username: registerCoreItems[0].value,
            Email: registerCoreItems[1].value,
            Password: registerCoreItems[2].value,
            FirstName: null,
            LastName: null,
            BirthDate: null,
            Sex: null
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
        type: actionTypes.END_REGISTER,
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


export const fetchUser = (user, fetchUserErrors, fetchUserResult) => {
    return {
        type: actionTypes.FETCH_USER,
        user,
        fetchUserErrors,
        fetchUserResult
    }
}

export const fetchUserACreator = id => {
    return dispatch => {
        axios.get('https://jsonplaceholder.typicode.com/users/' + id).then(response => {
            dispatch(fetchUser(response.data, [], true));
        }).catch(error => {
            dispatch(fetchUser(null, handleErrors(error), false));
        })
    }
}

export const loadTracks = (loadedTracks, loadTracksErrors, loadTrackResult) => {
    return {
        type: actionTypes.LOAD_TRACKS,
        loadedTracks,
        loadTracksErrors,
        loadTrackResult 
    }
}



export const loadTracksActionCreator = () => {
    return dispatch => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
            dispatch(loadTracks(response.data, [], true));
        }).catch(error => {
            dispatch(loadTracks(null, handleErrors(error), false));
        })
    }
}



export const logIn = (loginResult, loginErrors, token) => {
    return {
        type: actionTypes.LOGIN,
        loginResult: loginResult,
        loginErrors: loginErrors,
        token: token
    }
}

export const loginActionCreator = (login, password, history) => {
    return dispatch => {
        const objectToSend = {
            Username: login,
            Password: password
        }
        annonymousInstance.post("/users/login/", objectToSend).then(response => {
            dispatch(logIn(true, [], response.data.successResult.token));
            setCookie("token", 1, "/", response.data.successResult.token);
            document.cookie = `token=${response.data.successResult.token}; path=/`;
            history.push("/logged");
        }).catch(error => {
            dispatch(logIn(false, handleErrors(error), ""));
        })
    }
}
