import { GET_USER_DATA } from '../actionTypes';
import { getASpecyficCookieValue } from '../../services/cookiesHelper'; 
import { Api } from '../../api/index.js';

export const getUserDataACreator = () => dispatch => { 
    const cookie = document.cookie;
    const token = getASpecyficCookieValue("token", cookie);
    if(token){
        Api.User.getUserData().then(response => {
            dispatch(getUserData(response, []));
        }).catch(errors => dispatch(getUserData(null, errors)));
    }
}

export const getUserData = (userData, getUserDataErrors) => {
    return { type: GET_USER_DATA, userData, getUserDataErrors } 
} 