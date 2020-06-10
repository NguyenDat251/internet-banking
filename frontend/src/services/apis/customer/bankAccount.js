import {environment} from '../../../environment'
import { NameItem } from '../../../config/sessionStorage'
import axios from 'axios';

const baseURL = environment.host;
const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN)

const getListAccount = () => {
    return axios.get(`${baseURL}/api/customer/get-list-account`, {
        headers: {
            access_token: token
        }
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}

export const BankAccountServices = {
    getListAccount
}