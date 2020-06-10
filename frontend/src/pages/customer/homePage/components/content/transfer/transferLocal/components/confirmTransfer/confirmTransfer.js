import React from 'react';
import TextMoneyOutput from '../../../../component/textMoneyOutput/textMoneyOutput';
import TextOutput from '../../../../component/textOutput/textOutput';
import TextInput from '../../../../component/textInput/textInput';

const TransferForm = (props) => {
  const credit_account = props.bankAccount.credit_account[0];
  const SoTK = [credit_account.credit_number];
  const money = credit_account.balance;
  const handleForSubmit = (e) => {
    e.preventDefault();
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
        </div>
        <TextOutput title="Hình thức nhận mã OTP" text="Qua Email" />
        <TextInput
          title="Nhập mã OTP"
          type="number"
          placeholder="Nhập mã OTP"
        />
        <h6 className="center-align mt-4 text-danger">
          Mã OTP đã được gửi qua Email của quý khách
        </h6>
        <div className="mt-5 center-align row justify-content-center">
          <button className="btn btn-success" onClick={() => props.setStep(1)}>
            Trở về
          </button>
          <button className="btn btn-success ml-2" type="submit">
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;
