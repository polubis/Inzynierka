import { GET_SOUNDS_BY_TYPE } from '../actionTypes';
import { Api } from '../../api/index.js';
import { extractFilesFromZip } from '../../services/fileService';

export const getSoundsByType = (sounds, getSoundsErrors, getSoundsStatus) => {
    return { type: GET_SOUNDS_BY_TYPE, sounds, getSoundsErrors, getSoundsStatus } 
} 

export const getSoundsByTypeACreator = type => dispatch => {
    return new Promise((resolve, reject) => {
        Api.Sounds.getSoundsByType(type).then(response => {
            dispatch(getSoundsByType(response, [], true));
            resolve(response);
        }).catch(errors => {
            dispatch(getSoundsByType([], errors, false));
            reject();
        });
    })
}   
