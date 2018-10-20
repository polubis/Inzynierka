import { GET_SOUNDS_BY_TYPE } from '../actionTypes';
import { Api } from '../../api/index.js';
import { defineMusicSource } from '../../services/quizService';
export const getSoundsByType = (sounds, getSoundsErrors, getSoundsStatus) => {
    return { type: GET_SOUNDS_BY_TYPE, sounds, getSoundsErrors, getSoundsStatus } 
} 

export const getSoundsByTypeACreator = type => dispatch => {
    return new Promise((resolve, reject) => {
        switch(type){
            case "sound":
                Api.Sounds.getSounds().then(response => {
                    const probes = defineMusicSource(response.soundNames);
                    dispatch(getSoundsByType(probes, [], true));
                    resolve(probes);
                }).catch(errors => {
                    dispatch(getSoundsByType([], errors, false));
                    reject();
                });
                break;
            case "chord":
                Api.Sounds.getChords().then(response => {
                    const probes = defineMusicSource(response.soundNames);
                    dispatch(getSoundsByType(probes, [], true));
                    resolve(probes);
                }).catch(errors => {
                    dispatch(getSoundsByType([], errors, false));
                    reject();
                });
            break;
            default:
                Api.Sounds.getSoundsChords().then(response => {
                    const probes = defineMusicSource(response.soundNames);
                    dispatch(getSoundsByType(probes, [], true));
                    resolve(probes);
                }).catch(errors => {
                    dispatch(getSoundsByType([], errors, false));
                    reject();
                });
            break;
        }        
    })
}   
