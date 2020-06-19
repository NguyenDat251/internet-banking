import {environment} from '../../../environment'
import { NameItem } from '../../../config/sessionStorage'
import axios from 'axios';

const baseURL = environment.host;

const getListAccount = () => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN)
    return axios.get(`${baseURL}/api/customer/get-list-account`, {
        headers: {
            access_token: token
        }
    }).then(res => {
        return res.data
    })
}

const getRemindList = () => {
    const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN)
    return axios.get(`${baseURL}/api/customer/remind-list`, {
        headers: {
            access_token: token
        }
    }).then(res => {
        return res.data
    })
}


export const BankAccountServices = {
    getListAccount,
    getRemindList
}