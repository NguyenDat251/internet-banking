import {environment} from '../../environment'
import axios from 'axios';

const baseURL = environment.host;

const login = (username, password) => {
    return axios.post(`${baseURL}/api/customer/login`, {
        username,
        password
    }).then(res => {
        return res.data
    })
}

export const UserService = {
    login
}