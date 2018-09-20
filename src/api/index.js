import axios from "axios";
import '../services/inputValidator.jsx';
import { handleErrors } from '../store/utility/handleErrors.jsx';
import { deleteCookie, getASpecyficCookieValue } from '../services/cookiesHelper';
//import {store} from '../index';

//const getToken = state => state.Authenticate.token;

const token = getASpecyficCookieValue("token", document.cookie);

const endPoint = "http://localhost:52535/api";

const instance = axios.create({baseURL: endPoint});

instance.defaults.headers.common['Authorization'] = "Bearer " + token;

const contentTypes = {
    "standard": "application/x-www-form-urlencoded"
}

const dataExtractor = (requestType, path, payload, authorization, contentType) => {
    if(contentType){
        instance.defaults.headers['Content-Type'] = contentType;
    }
    return instance[requestType](endPoint + path, payload)
    .then(response => succParser(response))
    .catch(error => errorParser(error));
}

const succParser = response => {
    return response.data.successResult;
}
const errorParser = error => {
    if(error.response === undefined){
        throw ["Ups, coś poszło nie tak"];
    }

    const errors = handleErrors(error);
    
    if(error.response.status === 401){
        console.log(401);
        //deleteCookie("token");
        //window.location.href = "/";
    }
    

    throw errors;
}

export const Api = {
  Authorization: {
    login: loginModel => { return dataExtractor("post", "/users/login/", loginModel) },
    sendRegisterEmail: registerModel => { return dataExtractor("post", "/users/register/", registerModel) },
    endRegister: (activateAccountLink) => { return dataExtractor("post", "/users/activate/account/" + activateAccountLink) }
  },
  User: {
    getUserData: () => { return dataExtractor("get", "/users/userdata", undefined, true) }
  }
};
