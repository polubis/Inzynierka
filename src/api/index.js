import axios from "axios";
import '../services/inputValidator.jsx';
import { handleErrors } from '../store/utility/handleErrors.jsx';
import { deleteCookie } from '../services/cookiesHelper';
const endPoint = "http://localhost:52535/api";

/*
const instance = axios.create({
    baseURL: 'http://localhost:52535/api',
    headers: { 'Content-Type': 'multipart/form-data', 
    'Authorization' : "bearer " + token }
});
*/

const dataExtractor = (requestType, path, payload) => {
    return axios[requestType](endPoint + path, payload)
    .then(response => succParser(response))
    .catch(error => errorParser(error));
}

const succParser = response => {
    return response.data.successResult;
}
const errorParser = error => {
    const errors = handleErrors(error);
    console.log(error.response);
    if(error.response.status === 401){
        deleteCookie("token");
        window.location.href = "/";
    }

    throw errors;
}

export const Api = {
  Authorization: {
    login: loginModel => { return dataExtractor("post", "/users/login/", loginModel) },
    sendRegisterEmail: registerModel => { return dataExtractor("post", "/users/register/", registerModel) },
    endRegister: (activateAccountLink) => { return dataExtractor("post", "/users/activate/account/" + activateAccountLink) }
  }
};
