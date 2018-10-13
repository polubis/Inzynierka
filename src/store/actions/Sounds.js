import { GET_SOUNDS_BY_TYPE } from '../actionTypes';
import { Api } from '../../api/index.js';

export const getSoundsByType = (sounds, getSoundsErrors, getSoundsStatus) => {
    return { type: GET_SOUNDS_BY_TYPE, sounds, getSoundsErrors, getSoundsStatus } 
} 

export const getSoundsByTypeACreator = type => dispatch => {
    return new Promise((resolve, reject) => {
        switch(type){
            case "sound":
                Api.Sounds.getSounds().then(response => {
                    dispatch(getSoundsByType(response.soundNames, [], true));
                    resolve(response.soundNames);
                }).catch(errors => {
                    dispatch(getSoundsByType([], errors, false));
                    reject();
                });
                break;
            case "chord":
                Api.Sounds.getChords().then(response => {
                    dispatch(getSoundsByType(response.soundNames, [], true));
                    resolve(response.soundNames);
                }).catch(errors => {
                    dispatch(getSoundsByType([], errors, false));
                    reject();
                });
                break;
            case "mixed":
                Api.Sounds.getSoundsChords().then(response => {
                    dispatch(getSoundsByType(response.soundNames, [], true));
                    resolve(response.soundNames);
                }).catch(errors => {
                    dispatch(getSoundsByType([], errors, false));
                    reject();
                });
                break;
            default:
                break;
        }        
    })
}   
