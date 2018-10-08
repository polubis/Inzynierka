import { CREATE_RESULT } from '../actionTypes.js';
import { Api } from '../../api/index.js';


export const createResult = (createResultStatus, createResultErrors) => {
    return { type: CREATE_RESULT, createResultStatus, createResultErrors }
}

export const createResultACreator = () => dispatch => {
    return new Promise((resolve, reject) => {
        const resultModel = {};
        Api.Quiz.createResult(resultModel).then(response => {
            dispatch(createResult(true, []));
            resolve();
        }).catch(errors => {
            dispatch(createResult(false, errors));
            reject();
        });
    })
}
