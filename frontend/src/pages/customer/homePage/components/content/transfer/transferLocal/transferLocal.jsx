import React, { useEffect, useState } from 'react';
import Title from '../../component/title/title';
import './transferLocal.scss';
import TransferForm from './components/transferForm/transferForm';
import ConfirmTransfer from './components/confirmTransfer/confirmTransfer'
import { connect } from 'react-redux';
import { bankAccountActions } from '../../../../../../../actions/customer/bankAccount';
import { transferActions } from '../../../../../../../actions/customer/transfer';

const sender = 'Người chuyển trả';
const receiver = 'Người nhận trả';

const TransferLocal = ({ bankAccount, getBankAccount, transfer, getRemindList }) => {
  const hinhThuc = ['Qua email'];
  const [soTaiKhoan, setSoTaiKhoan] = useState();
  const [tenNguoiHuong, setTenNguoiHuong] = useState();
  const [tenGoiNho, setTenGoiNho] = useState();
  const [luuThongTin, setLuuThongTin] = useState(false);
  const [soTien, setSoTien] = useState();
  const [noiDung, setNoiDung] = useState();
  const [nguoiTraPhi, setNguoiTraPhi] = useState(sender);
  const [step, setStep] = useState(1);

  useEffect(() => {
    getBankAccount();
  }, []);

  return (
    <div className="transferLocal">
      <Title title="CHUYỂN TIỀN CHO NGƯỜI HƯỞNG Ở CÙNG NGÂN HÀNG" />
      {step === 1 && bankAccount.credit_account && (
        <TransferForm
          bankAccount={bankAccount}
          soTaiKhoan={soTaiKhoan}
          setSoTaiKhoan={setSoTaiKhoan}
          tenNguoiHuong={tenNguoiHuong}
          setTenNguoiHuong={setTenNguoiHuong}
          tenGoiNho={tenGoiNho}
          setTenGoiNho={setTenGoiNho}
          luuThongTin = {luuThongTin}
          setLuuThongTin = {setLuuThongTin}
          soTien={soTien}
          setSoTien={setSoTien}
          noiDung={noiDung}
          setNoiDung={setNoiDung}
          nguoiTraPhi={nguoiTraPhi}
          setNguoiTraPhi={setNguoiTraPhi}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <ConfirmTransfer
          bankAccount={bankAccount}
          soTaiKhoan={soTaiKhoan}
          tenNguoiHuong={tenNguoiHuong}
          soTien={soTien}
          noiDung={noiDung}
          nguoiTraPhi={nguoiTraPhi}
          setStep={setStep}/>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  bankAccount: state.bankAccount,
});

const mapDispatchToProps = (dispatch) => ({
  getBankAccount: () => dispatch(bankAccountActions.getBankAccount()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TransferLocal);
