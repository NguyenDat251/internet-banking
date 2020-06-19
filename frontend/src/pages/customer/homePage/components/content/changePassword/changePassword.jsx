import React, { useState } from 'react';
import Title from '../component/title/title';
import TextInput from '../component/textInput/textInput';
import ReCAPTCHA from 'react-google-recaptcha';
import { environment } from '../../../../../../environment';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [isVerified, setIsVerified] = useState(false);

  const onHandleSubmit = () => {
    
  };

  const verifyCallback = (res) => {
    if (res) {
      setIsVerified(true);
    }
  };

  return (
    <div className="accountInfo">
      <Title title="THÔNG TIN CÁ NHÂN" />
      <div className="mt-4">
        <TextInput
          title="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu hiện tại"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextInput
          title="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextInput
          title="Mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
    </div>
  );
};

export default ChangePassword;
