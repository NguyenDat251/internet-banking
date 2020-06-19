import React, { useState, useEffect } from 'react';
import Title from '../component/title/title';
import TextInput from '../component/textInput/textInput';
import ReCAPTCHA from 'react-google-recaptcha';
import { environment } from '../../../../../../environment';
import { userActions } from '../../../../../../actions/user';
import { connect } from 'react-redux';
import {NotificationManager, NotificationContainer} from 'react-notifications';

const ChangePassword = ({customer, changePassword}) => {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();

  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if(customer.changePasswordSuccess === true){
      NotificationManager.success('Đổi mật khẩu thành công')
      setTimeout(function(){
        window.location.reload()
      }, 2000)
    }
    if(customer.changePasswordError){
      NotificationManager.error('Mật khẩu hiện tại không đúng, vui lòng thử lại sau');
    }
  }, [customer])

  const onHandleSubmit = () => {
    if(!currentPassword || !newPassword || !confirmPassword){
      setError("Vui lòng điền đầy đủ các mục")
      return
    }
    if(newPassword !== confirmPassword){
      setError("Mật khẩu xác nhận không trùng khớp")
      return
    }
    if(isVerified === false){
      setError("Vui lòng xác nhận captcha")
      return
    }
    changePassword(currentPassword, newPassword, confirmPassword);
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
          autoFocus
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextInput
          title="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextInput
          title="Mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && (
          <div className="mt-3 center-align">
            <span className="text-danger">{error}</span>
          </div>
        )}
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
      <NotificationContainer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customer: state.customer,
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (old_password, new_password, confirm_new_password) => dispatch(userActions.changePassword(old_password, new_password, confirm_new_password))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
