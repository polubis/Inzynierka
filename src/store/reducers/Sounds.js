import { GET_SOUNDS_BY_TYPE } from '../actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
    sounds: [],
    getSoundsErrors: [],
    getSoundsStatus: null
}

const Sounds = (state = initialState, action) => {
    switch(action.type){
        case GET_SOUNDS_BY_TYPE:
            return updateObject(state, { getSoundsErrors: action.getSoundsErrors, 
                sounds: action.sounds, getSoundsStatus: action.getSoundsStatus })
        default:
            break;
    }
    return state;   
}
export default Sounds;