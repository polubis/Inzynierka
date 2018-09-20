import { GET_USER_DATA } from '../actionTypes';
import { Api } from '../../api/index.js';

export const getUserDataACreator = () => dispatch => { 
    Api.User.getUserData().then(response => {
        dispatch(getUserData(response, []));
    }).catch(errors => dispatch(getUserData(null, errors)));
}

export const getUserData = (userData, getUserDataErrors) => {
    return { type: GET_USER_DATA, userData, getUserDataErrors } 
} 