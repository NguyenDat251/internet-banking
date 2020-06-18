import React, { useState, useEffect } from 'react';
import TextMoneyOutput from '../../../../component/textMoneyOutput/textMoneyOutput';
import TextOutput from '../../../../component/textOutput/textOutput';
import TextInput from '../../../../component/textInput/textInput';
import { transferActions } from '../../../../../../../../../actions/customer/transfer';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import { connect } from 'react-redux';


const TransferForm = (props) => {
  console.log(typeof(props.transactionId) + " " + props.transactionId)
  const credit_account = props.bankAccount.credit_account[0];
  const SoTK = [credit_account.credit_number];
  const money = credit_account.balance;
  const [otp, setOtp] = useState();

  useEffect(() => {
    if(props.transfer.verifyOtpSuccess === true){
      NotificationManager.success('Chuyển tiền thành công');
    } 
    if(props.transfer.verifyOtpError){
      NotificationManager.error("Mã OTP không hợp lệ")
    }
  }, [props.transfer])

  const handleForSubmit = (e) => {
    e.preventDefault();
    if(!otp){
      NotificationManager.warning('Vui lòng nhập mã OTP');
    }
    props.verifyOtp(props.transactionId, otp)
  };
  return (
    <div className="transferForm">
      <div className="mt-4">
        <h5 className="text-success">THÔNG TIN NGƯỜI CHUYỂN</h5>
        <hr />
      </div>
      <form onSubmit={handleForSubmit}>
        <TextOutput title="Tài khoản nguồn" text={SoTK} />
        <TextMoneyOutput title="Số dư khả dụng" money={money} />
        <div className="mt-5">
          <h5 className="text-success">THÔNG TIN NGƯỜI HƯỞNG</h5>
          <hr />
          <TextOutput title="Số tài khoản" text={props.soTaiKhoan} />
          <TextOutput title="Tên người hưởng" text={props.tenNguoiHuong} />
        </div>

        <div className="mt-5">
          <h5 className="text-success">NỘI DUNG CHUYỂN TIỀN</h5>
          <hr />
          <TextMoneyOutput title="Số tiền chuyển" money={props.soTien} />
          <TextOutput title="Nội dung chuyển" text={props.noiDung} />
          <TextOutput title="Phí chuyển tiền" text={props.nguoiTraPhi} />
          <TextMoneyOutput title="Số tiền phí" money={2000} />
        </div>
        <TextOutput title="Hình thức nhận mã OTP" text="Qua Email" />
        <TextInput
          title="Nhập mã OTP"
          type="number"
          placeholder="Nhập mã OTP"
          onChange={ e => setOtp(e.target.value)}
        />
        <h6 className="center-align mt-4 text-danger">
          Mã OTP đã được gửi qua Email của quý khách
        </h6>
        <div className="mt-5 center-align row justify-content-center">
          <button className="btn btn-success" onClick={() => props.setStep(1)}>
            Trở về
          </button>
          <button className="btn btn-success ml-2" type="submit">
            {props.transfer.verifyOtpPending === true && <i className="fa fa-refresh fa-spin mr-3"/>}
            Xác nhận
          </button>
        </div>
      </form>
      <NotificationContainer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  transfer: state.transfer,
});

const mapDispatchToProps = (dispatch) => ({
  verifyOtp: (id, otp) => dispatch(transferActions.verifyOtp(id, otp))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransferForm);
