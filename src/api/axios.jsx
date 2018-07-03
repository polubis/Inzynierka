import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:52535/api',
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
});

/*
const config = {
    headers: {'Content-Type': 'multipart/form-data', 
    'Authorization' : "bearer " + token}
}; 
*/
export default instance;