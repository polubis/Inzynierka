import {GET_USER_DATA} from '../actionTypes.js';
import { updateObject } from '../utility/updateObject';

const initialState = {
    userData: null,
    getUserDataErrors: []
}
const User = (state = initialState, action) => {
    switch(action.type){
        case GET_USER_DATA:
            return updateObject(state, { userData: action.userData,
                getUserDataErrors: action.getUserDataErrors,
        })
    }
    return state;   
}
export default User;