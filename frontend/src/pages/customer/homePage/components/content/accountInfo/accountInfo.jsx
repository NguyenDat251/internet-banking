import React from 'react';
import Title from '../component/title/title';
import TextInput from '../component/textInput/textInput';

const AccountInfo = () => {
  return (
    <div className="accountInfo">
      <Title title="THÔNG TIN CÁ NHÂN" />
      <div className="mt-4">
        <TextInput title="Tên khách hàng" disabled={true} />
        <TextInput title="Ngày sinh" disabled={true} />
        <TextInput title="Chứng minh nhân dân" disabled={true} />
        <TextInput title="Số điện thoại liên hệ" disabled={true}/>
        <TextInput title="Email" />
        <div className="mt-5 center-align">
          <button className="btn btn-success float-center" type="submit">
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
