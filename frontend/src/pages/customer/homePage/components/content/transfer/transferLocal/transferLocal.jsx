import React, { useEffect, useState } from 'react'
import Title from '../../component/title/title'
import "./transferLocal.scss"
import TransferForm from './components/transferForm/transferForm';
import { connect } from 'react-redux';
import { bankAccountActions } from '../../../../../../../actions/customer/bankAccount';

const TransferLocal = ({bankAccount, getBankAccount}) => {
    const hinhThuc = ['Qua email'];
    const [soTaiKhoan, setSoTaiKhoan] = useState();
    const [tenNguoiHuong, setTenNguoiHuong] = useState();
    const [tenGoiNho, setTenGoiNho] = useState()
    const [soTien, setSoTien] = useState();
    const [noiDung, setNoiDung] = useState();
    const [nguoiTraPhi, setNguoiTraPhi] = useState();
    const [step, setStep] = useState(1);

    useEffect(() => {
       getBankAccount();
    }, [])

    return (
        <div className="transferLocal">
                <Title title="CHUYỂN TIỀN CHO NGƯỜI HƯỞNG Ở CÙNG NGÂN HÀNG"/>
                <div className="mt-4">
                    <h5 className="text-success">THÔNG TIN NGƯỜI CHUYỂN</h5>
                    <hr/>
                </div>
                {step === 1 && bankAccount.credit_account && (
                    <TransferForm 
                    bankAccount = {bankAccount}
                    soTaiKhoan = {soTaiKhoan}
                    setSoTaiKhoan = {setSoTaiKhoan}
                    tenNguoiHuong = {tenNguoiHuong}
                    setTenNguoiHuong = {setTenNguoiHuong}
                    tenGoiNho = {tenGoiNho}
                    setTenGoiNho = {setTenGoiNho}
                    soTien = {soTien}
                    setSoTien = {setSoTien}
                    noiDung = {noiDung}
                    setNoiDung = {setNoiDung}
                    setNguoiTraPhi= {setNguoiTraPhi}
                    setStep = {setStep}/>
                )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    bankAccount: state.bankAccount
})

const mapDispatchToProps = (dispatch) => ({
    getBankAccount: () => dispatch(bankAccountActions.getBankAccount())
})
export default connect(mapStateToProps, mapDispatchToProps)(TransferLocal)
