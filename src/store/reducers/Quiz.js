import { CREATE_RESULT } from '../actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
   resultData: null, createResultStatus: null, createResultErrors: []
}

const Quiz = (state = initialState, action) => {
    switch(action.type){
        case CREATE_RESULT:
            return updateObject(state, { resultData: action.resultData, createResultStatus: action.createResultStatus, 
                createResultErrors: action.createResultErrors })
        default:
            break;
    }
    return state;   
}
export default Quiz;