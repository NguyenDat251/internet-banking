import React, { useState } from 'react';
import Title from '../components/title/title';
import TextInput from '../components/textInput/textInput';
import TextMMoneyInput from '../components/textMoneyInput/textMoneyInput';
import {
    NotificationManager,
    NotificationContainer,
  } from 'react-notifications';

const AddMoneyToAccount = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const [creditNumber, setCreditNumber] = useState();
    const [name, setName] = useState('')
  return (
    <div className="add-money-to-acount">
      <Title title="Nạp tiền vào tài khoản" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mt-5">
          <h5 className="text-success">Thông tin khách hàng</h5>
          <hr />
          <TextInput
            title="Số tài khoản"
            autoFocus
            placeholder="Nhập số tài khoản"
            type="text"
            onChange={(e) => setCreditNumber(e.target.value)}
          />
          <TextInput
            title="Tên khách hàng"
            placeholder="Tên khách hàng"
            disabled
            value={name}
          />
        </div>
        <div className="mt-5">
          <h5 className="text-success">Thông tin nạp</h5>
          <hr />
          <TextMMoneyInput title="Số tiền cần nạp"/>
          <TextMMoneyInput title="Nhập lại số tiền cần nạp"/>
        </div>
        <div className="mt-5 center-align">
          <button className="btn btn-success float-center" type="submit">
            Nạp tiền
          </button>
        </div>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default AddMoneyToAccount;
