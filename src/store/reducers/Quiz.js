import { CREATE_RESULT } from '../actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
   createResultStatus: null, createResultErrors: []
}

const Quiz = (state = initialState, action) => {
    switch(action.type){
        case CREATE_RESULT:
            return updateObject(state, { createResultStatus: action.createResultStatus, 
                createResultErrors: action.createResultErrors })
        default:
            break;
    }
    return state;   
}
export default Quiz;