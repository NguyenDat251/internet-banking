import { environment } from '../../environment';
import { NameItem } from '../../config/sessionStorage';
import axios from 'axios';

const baseURL = environment.host;

const login = (username, password) => {
  return axios
    .post(`${baseURL}/api/customer/login`, {
      username,
      password,
    })
    .then((res) => {
      return res.data;
    });
};

const forgotPassword = (username, idNumber) => {
  return axios
    .post(`${baseURL}/api/customer/reset-password`, {
      username: username,
      identity_number: idNumber,
    })
    .then((res) => {
      return res.data;
    });
};

const verifyOtp = (reset_id, otp) => {
  return axios
    .post(`${baseURL}/api/customer/verify-otp-resetpass`, {
      reset_id: reset_id,
      otp: otp,
    })
    .then((res) => {
      return res.data;
    });
};

const changePassword = (old_password, new_password, confirm_new_password) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(
      `${baseURL}/api/customer/change-password`,
      {
        old_password: old_password,
        new_password: new_password,
        confirm_new_password: confirm_new_password,
      },
      {
        headers: {
          access_token: token,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};

export const UserService = {
  login,
  forgotPassword,
  verifyOtp,
  changePassword,
};
