import { environment } from '../../../environment';
import { NameItem } from '../../../config/sessionStorage';
import axios from 'axios';
const baseURL = environment.host;

const login = (username, password) => {
  return axios
    .post(`${baseURL}/api/admin/login`, {
      username,
      password,
    })
    .then((res) => {
      return res.data;
    });
};

export const AdminServices = {
  login,
};
