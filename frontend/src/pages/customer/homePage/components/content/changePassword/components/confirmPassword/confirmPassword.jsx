import React, { useState } from 'react';
import TextInput from '../../../component/textInput/textInput';
import SelectInput from '../../../bankAccount/components/selectInput/selectInput';
import ReCAPTCHA from 'react-google-recaptcha';
import { environment } from '../../../../../../../../environment';

const ConfirmPassword = (props) => {
  const [isVerified, setIsVerified] = useState(false);

  const onHandleSubmit = () => {
    if(props.confirmPassword && props.confirmPassword.length>0 && props.newPassword===props.confirmPassword && isVerified){
        props.setStep(2);
    }
  };

  const verifyCallback = (res) => {
    if (res) {
      setIsVerified(true);
    }
  };
  return (
    <div className="mt-4">
      <TextInput title="Tên truy cập" disabled="true" />
      <TextInput
        title="Mật khẩu hiện tại"
        placeholder="Nhập mật khẩu hiện tại"
        type="password"
        value={props.currentPasswordd}
        onChange={e=>props.setCurrentPassword(e.target.value)}
      />
      <TextInput
        title="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        type="password"
        value={props.newPassword}
        onChange={e => props.setNewPassword(e.target.value)}
      />
      <TextInput
        title="Mật khẩu mới"
        placeholder="Nhập lại mật khẩu mới"
        type="password"
        value={props.confirmPassword}
        onChange={e => props.setConfirmPassword(e.target.value)}
      />
      <SelectInput title="Hình thức nhận mã OTP" items={props.hinhThuc} />
      <div className="mt-4 row">
        <div className="col-4"></div>
        <ReCAPTCHA
          className="col-8"
          sitekey={environment.SITE_KEY}
          onChange={verifyCallback}
        />
      </div>
      <div className="mt-5 center-align">
        <button
          className="btn btn-success float-center"
          type="submit"
          onClick={onHandleSubmit}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ConfirmPassword;
