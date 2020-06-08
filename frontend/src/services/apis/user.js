import NameLocal from '../../config/localStorage'
import {environment} from '../../environment'
import axios from 'axios';

const baseURL = environment.host;

const login = (username, password) => {
    return axios.post(`${baseURL}/api/customer/login`, {
        username,
        password
    }).then(res => {
        return res.data
    }).catch(err => {
        return err;
    })
}

export const UserService = {
    login
}