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
  var data = JSON.stringify({ credit_number: '565572661049' });

  var config = {
    method: 'get',
    url: 'http://bank-backend.khuedoan.com/api/customer/get-credit-info',
    headers: {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MywiaWF0IjoxNTkxODQyODA1LCJleHAiOjE1OTE4NDg4MDV9.KJreg-WciGtn3L24IzRX7YgpMhUp5SJcQOwoku1xt4M',
      'Content-Type': 'application/json',
    },
    data: data,
  };
  return axios(config).then((res) => {
    return res.data;
  });
};

export const TransferServices = {
  transferLocal,
  verifyOtp,
  findReceiver,
};