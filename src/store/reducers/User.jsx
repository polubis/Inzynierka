import * as actionTypes from '../actionTypes';
import { updateObject } from '../utility/updateObject';


const initialState = {
    user: null,
    fetchUserErrors: [],
    fetchUserResult: null,

    loadedTracks: [],
    loadTracksErrors: [],
    loadTrackResult: null
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_USER:
            return updateObject(state, {user: action.user, fetchUserErrors: action.fetchUserErrors,
                fetchUserResult: action.fetchUserResult})
        case actionTypes.LOAD_TRACKS:
            return updateObject(state, {loadedTracks: action.loadedTracks, 
                loadTracksErrors: action.loadTracksErrors, loadTrackResult: action.loadTrackResult});
        default:
        
        break;
    }
    return state;   
}
export default reducer;