import { environment } from '../../../environment';
import { NameItem } from '../../../config/sessionStorage';
import axios from 'axios';

const baseURL = environment.host;

const transferLocal = (
  name,
  from_credit_number,
  to_credit_number,
  amount,
  fee_payer,
  message
) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(
      `${baseURL}/api/customer/transfer-fund`,
      {
        target_fullname: name,
        from_credit_number: from_credit_number,
        to_credit_number: to_credit_number,
        amount: amount,
        fee_payer: fee_payer,
        partner_code: 'local',
        message: message,
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

const verifyOtp = (id, otp) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(
      `${baseURL}/api/customer/verify-otp`,
      {
        transaction_id: id,
        otp: otp,
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

const findReceiver = (credit_number) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  let config ={
    headers: {access_token: token},
    params: {
      credit_number: credit_number
    },
  }
  return axios.get(
    `${baseURL}/api/customer/get-credit-info`,config).then((res) => {
    return res.data;
  });
};

const getRemindList = () => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  let config = {
    headers: {access_token: token},
  }
  return axios.get(
    `${baseURL}/api/customer/remind-list`, config).then((res) => {
      return res.data
    })
}

const saveRemindList = (credit_number, remind_name, bank_name) => {
  const token = sessionStorage.getItem(NameItem.ACCESS_TOKEN);
  return axios
    .post(
      `${baseURL}/api/customer/remind-list`,
      {
        credit_number: credit_number,
        remind_name: remind_name,
        partner_code: bank_name
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
}

export const TransferServices = {
  transferLocal,
  verifyOtp,
  findReceiver,
  getRemindList,
  saveRemindList
};
