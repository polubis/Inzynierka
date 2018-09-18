import axios from "axios";

/*
const instance = axios.create({
    baseURL: 'http://localhost:52535/api',
    headers: { 'Content-Type': 'multipart/form-data', 
    'Authorization' : "bearer " + token }
});
*/

const endpoint = "http://localhost:52535/api";

const requestTypes = ["get", "post", "put", "patch", "delete"];

const returnWebaround = (requestType, requestPoint, payload) => {

    return axios[requestType](endpoint + requestPoint, payload)
      .then(response => parseSuccessData(response))
      .catch(error => validateAuthorization(error))
};

const parseSuccessData = response => {
    console.log(response);
    return response.data.successResult;
};

const validateAuthorization = error => {
  console.log(error);
    
  return error;
};


export const Api = {
  Authorization: {
    login: loginModel => {
        console.log(returnWebaround("post", "/users/login/", loginModel))
        return returnWebaround("post", "/users/login/", loginModel);
    },
    register: registerModel => {
        return returnWebaround("post", "/users/register/", registerModel);
    }
      
  }
};
