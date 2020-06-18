import React, { useState, useEffect } from 'react';
import HeaderHomePage from '../loginPage/components/header/header';
import './forgotPassword.component.scss';
import TextInput from '../../customer/homePage/components/content/component/textInput/textInput';
import { userActions } from '../../../actions/user';
import { connect } from 'react-redux';
import {NotificationManager, NotificationContainer} from 'react-notifications';

const ForgotPassword = ({ customer, forgotPassword, verifyOtp }) => {
  const [error, setError] = useState();
  const [username, setUsername] = useState();
  const [idNumber, setIdNumber] = useState();
  const [resetId, setResetId] = useState();
  const [otp, setOtp] = useState();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (customer.forgotPasswordSuccess === true) {
        setResetId(customer.reset_id)
        setStep(2);
    }
    if (customer.forgotPasswordError) {
      setError('Tên truy cập hoặc số CMND không chính xác');
    }
    if(customer.verifyOtpSuccess === true){
        NotificationManager.success('Xác nhận thành công');
    }
    if(customer.verifyOtpError){
        NotificationManager.error('Mã OTP không hợp lệ');
    }
  }, [customer]);

  const onhandleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!username) {
        setError('Vui lòng nhập tên truy cập');
        return;
      }
      if (!idNumber) {
        setError('Vui lòng nhập số CMND');
        return;
      }
      forgotPassword(username, idNumber);
    }
    if(step === 2){
        if(!otp){
            NotificationManager.warning('Vui lòng nhập mã OTP');
        }
        verifyOtp(resetId, otp)
    }
  };
  return (
    <div className="forgot-password">
      <HeaderHomePage />
      <div className="card custom mt-5">
        <div className="background-black">
          <span className="text-white font-weight-bolder">QUÊN MẬT KHẨU</span>
          <hr />
        </div>
        <form onSubmit={(e) => onhandleSubmit(e)}>
          {step === 1 && (
            <div className="mt-4 form-group">
              <TextInput
                title="Tên truy cập"
                placeholder="Nhập tên truy cập"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextInput
                title="Số CMND"
                placeholder="Nhập số CMND"
                onChange={(e) => setIdNumber(e.target.value)}
              />
              {error && (
                <div className="mt-3 center-align">
                  <span className="text-danger">{error}</span>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <TextInput
                title="Mã OTP"
                placeholder="Nhập mã OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="mt-3 center-align">
                <span className="text-danger">
                  Mã OTP đã được gửi qua email của quý khách
                </span>
              </div>
            </div>
          )}

          <div className="mt-4 center-align">
            <button className="btn btn-success float-center" type="submit">
              Xác nhận
            </button>
          </div>
        </form>
      </div>
      <NotificationContainer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customer: state.customer,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (username, idNumber) =>
    dispatch(userActions.forgotPassword(username, idNumber)),
  verifyOtp: (reset_id, otp) => dispatch(userActions.verifyOtp(reset_id, otp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
