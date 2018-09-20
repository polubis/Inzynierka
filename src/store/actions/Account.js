import { SEND_REGISTER_EMAIL, END_REGISTER } from '../actionTypes.js';
import { handleErrors } from '../utility/handleErrors';
import { Api } from '../../api/index.js';

export const endRegister = (registerResult, registerError, registerUserData) => {
    return { type: END_REGISTER, registerResult, registerError, registerUserData }
}

export const endRegisterActionCreator = currentUrl => {
    return dispatch => {
        const indexOfLastSlash = currentUrl.lastIndexOf("/");
        const activateAccountLink = currentUrl.slice(indexOfLastSlash+1, currentUrl.length);
        
        Api.Authorization.endRegister(activateAccountLink).then(response => {
            const model = {...response};
            model.creationDate = model.creationDate.slice(0, 10) + " " + model.creationDate.slice(11, 16);
            model.modifiedDate = model.modifiedDate.slice(0, 10) + " " + model.modifiedDate.slice(11, 16);
            
            dispatch(endRegister(true, [], model));
        }).catch( errors => dispatch(endRegister(false, errors, null)) );
    }
}

export const sendRegisterEmail = (sendEmailResult, sendEmailError) => {
    return {
        type: SEND_REGISTER_EMAIL, sendEmailResult, sendEmailError
    };
}
export const sendRegisterEmailActionCreator = (firstArray, secondArray) => {
    return dispatch => {
        const registerModel = {
            "Username": firstArray[0].value,
            "Email": firstArray[1].value,
            "Password": firstArray[2].value,
            "FirstName": secondArray[0].value === "" ? null : secondArray[0].value,
            "LastName": secondArray[1].value === "" ? null : secondArray[1].value,
            "BirthDate": secondArray[2].value === "" ? null : secondArray[2].value,
            "Sex": secondArray[3].value === "wybierz pole" ? null : 
                secondArray[3].value === "Kobieta" ? false : true
        }
        Api.Authorization.sendRegisterEmail(registerModel).then(response => dispatch(sendRegisterEmail(true, "")))
        .catch(errors => dispatch(sendRegisterEmail(false, errors)))
    }
}