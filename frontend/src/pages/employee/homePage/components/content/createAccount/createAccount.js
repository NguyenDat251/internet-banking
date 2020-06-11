import React from 'react';
import Title from '../components/title/title';
import TextInput from '../components/textInput/textInput';

const CreateAccount = () => {
  return (
    <div className="creatAccountContainer">
      <Title title="Tạo tài khoản khách hàng" />
      <form>
        <div className="mt-5">
          <h5 className="text-success">Thông tin đăng nhập</h5>
          <hr />
          <TextInput
            title="Tài khoản"
            placeholder="Nhập tài khoản"
            type="text"
          />
          <TextInput
            title="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
          />
        </div>
        <div className="mt-5">
          <h5 className="text-success">Thông tin cá nhân</h5>
          <hr />
          <TextInput
            title="Họ"
            placeholder="Nhập họ và tên lót khách hàng"
            type="text"
          />
          <TextInput
            title="Tên"
            placeholder="Nhập tên khách hàng"
            type="text"
          />
          <TextInput
            title="CMND"
            placeholder="Nhập chứng minh nhân dân"
            type="number"
          />
          <TextInput title="Ngày sinh" type="number" />
          <TextInput title="Email" placeholder="Nhập email" type="email" />
        </div>
        <div className="mt-5 center-align">
          <button className="btn btn-success float-center" type="submit">
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
