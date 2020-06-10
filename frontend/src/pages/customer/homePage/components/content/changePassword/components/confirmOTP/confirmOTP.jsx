import React from 'react';
import TextInput from '../../../component/textInput/textInput';
import SelectInput from '../../../bankAccount/components/selectInput/selectInput';

const confirmOTP = (props) => {
    const onHandleSubmit=()=>{}
    const onHandleBack = () => {
        props.setStep(1);
    }
  return (
    <div className="mt-4 confirmOTP">
      <TextInput title="Tên truy cập" disabled="true" />
      <TextInput
        title="Mật khẩu"
        type="password"
        value={props.newPassword}
        disabled={"true"}
      />
      <TextInput title="Nhập mã OTP" type="number" placeholder="Nhập mã OTP"/>
      <SelectInput title="Hình thức nhận mã OTP" items={props.hinhThuc} />
      <h6 className="center-align mt-4 text-danger">Mã OTP đã được gửi qua Email của quý khách</h6>
      <div className="mt-4 center-align row justify-content-center">
      <button
          className="btn btn-success"
          type="submit"
          onClick={onHandleBack}>
          Trờ lại
        </button>
        <button
          className="btn btn-success ml-2"
          type="submit"
          onClick={onHandleSubmit}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default confirmOTP;
