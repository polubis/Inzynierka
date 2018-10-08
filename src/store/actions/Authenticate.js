import { LOGIN } from '../actionTypes.js';
import { Api } from '../../api/index.js';
import { getUserData } from './User.js';

export const logoutActionCreator = (history, path) => {
    return dispatch => {
        dispatch(logIn(null, [], ""));
        history.push(path);
    }
}

export const logIn = (loginResult, loginErrors, token) => {
    return {
        type: LOGIN, loginResult, loginErrors, token
    }
}

export const loginActionCreator = (loginArray, history) => {
    return dispatch => {
        const loginModel = {
            "Username": loginArray[0].value,
            "Password": loginArray[1].value
        }

        Api.Authorization.login(loginModel).then(response => {
            dispatch(logIn(true, [], response.token));
            dispatch(getUserData(response, []));
            history.push("/main");
        }).catch(errors => {
            dispatch(logIn(false, errors, "", ""));
        })
    }
}
