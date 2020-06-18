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

const forgotPassword = (username, idNumber) => {
    return axios.post(`${baseURL}/api/customer/reset-password`, {
        username: username,
        identity_number: idNumber
    }).then(res => {
        return res.data
    })
}

const verifyOtp = (reset_id, otp) => {
    return axios.post(`${baseURL}/api/customer/verify-otp-resetpass`, {
        reset_id: reset_id,
        otp: otp
    }).then(res => {
        return res.data
    })
}

export const UserService = {
    login,
    forgotPassword,
    verifyOtp
}