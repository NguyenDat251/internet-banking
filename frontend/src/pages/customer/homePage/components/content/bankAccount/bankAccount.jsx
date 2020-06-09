import React, { useState, useEffect } from 'react'
import Title from '../component/title/title'
import SelectInput from './components/selectInput/selectInput'
import TextMoneyOutput from '../component/textMoneyOutput/textMoneyOutput'
import { bankAccountActions } from '../../../../../../actions/customer/bankAccount'
import { connect } from 'react-redux'


const CREDIT_ACCOUNT = "Tiền gửi thanh toán"
const SAVING_ACCOUNT = "Tiền gửi tiết kiệm"

const BankAccount = ({bankAccount, getBankAccount}) => {
    const taikhoan = [CREDIT_ACCOUNT, SAVING_ACCOUNT];
    const loaiTaiKhoan = { "Tiền gửi thanh toán": "credit_account", "Tiền gửi tiết kiệm": "saving_account"}
    const [accountType, setAccountType] = useState(taikhoan[0]);
    const [accountNumber, setAccountNumber] = useState([]);
    const [accountNumberValue, setAccountNumberValue] = useState();
    const [money, setMoney] = useState(0);

    useEffect(() => {
        getBankAccount()
    }, [])

    useEffect(() => {
       if(bankAccount.bankAccountSuccess === true){
           let accounts = bankAccount[loaiTaiKhoan[accountType]];
           let accountNumberArr = accounts.map(item => item.credit_number)
           setAccountNumber(accountNumberArr)
           accountNumberArr.length > 0 && setMoney(accounts[0].balance);
        }
    }, [bankAccount])
    
    useEffect(() => {
        if(bankAccount.bankAccountSuccess === true){
            let accounts = bankAccount[loaiTaiKhoan[accountType]];
            let accountNumberArr = accounts.map(item => item.credit_number)
            setAccountNumber(accountNumberArr)
            accountNumberArr.length > 0 ? setMoney(accounts[0].balance) : setMoney(0)
        }
    }, [accountType])

    useEffect(() => {
        if(bankAccount.bankAccountSuccess === true){
            let accounts = bankAccount[loaiTaiKhoan[accountType]];
            let account = accounts.filter(account => account.credit_account === accountNumberValue)
            account.length > 0 ? setMoney(account[0].balance) : setMoney(0)
        }
    }, [accountNumberValue])

    return (
        <div className="contentContainer">
            <Title title="THÔNG TIN TÀI KHOẢN NGÂN HÀNG"/>
            <div className="inputContainer mt-4">
                <h5 className="text-success">DANH SÁCH TÀI KHOẢN</h5>
                <hr/>
                <SelectInput title="Loại tài khoản" items={taikhoan} onChange={e => setAccountType(e.target.value)}/>
                <SelectInput title="Chọn tài khoản" items={accountNumber} onChange={e => setAccountNumberValue(e.target.value)}/>
                <TextMoneyOutput title="Số dư hiện tại" money={money}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    bankAccount: state.bankAccount
})

const mapDispatchToProps = dispatch => ({
    getBankAccount: () => dispatch(bankAccountActions.getBankAccount())
})

export default connect(mapStateToProps, mapDispatchToProps)(BankAccount)
