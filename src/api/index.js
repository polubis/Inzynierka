import axios from "axios";
import '../services/inputValidator.jsx';
import { handleErrors } from '../store/utility/handleErrors.jsx';
import { history } from '../index';
import storeCreator from '../store/index';
import { logoutActionCreator } from '../store/actions/Authenticate';
const { store } = storeCreator;

const getToken = state => state.Authenticate.token;

const endPoint = "http://localhost:52535/api";

const instance = axios.create({baseURL: endPoint});

const contentTypes = {
    "standard": "application/x-www-form-urlencoded"
}

const dataExtractor = (requestType, path, payload, authorization, contentType) => {
    if(authorization){
        const token = getToken(store.getState());
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    }
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
        store.dispatch(logoutActionCreator(history, "/login"));
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
    getUserData: () => { return dataExtractor("get", "/usersd/userdata", undefined, true) }
  }
};
