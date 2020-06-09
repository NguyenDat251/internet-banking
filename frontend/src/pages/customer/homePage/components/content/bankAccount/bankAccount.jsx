import React, { useState, useEffect } from 'react'
import Title from '../component/title/title'
import SelectInput from './components/selectInput/selectInput'
import TextMoneyOutput from '../component/textMoneyOutput/textMoneyOutput'
import { bankAccountActions } from '../../../../../../actions/customer/bankAccount'
import { connect } from 'react-redux'

const BankAccount = ({bankAccount, getBankAccount}) => {
    const taikhoan = ['Tiền gửi thanh toán', 'TIền gửi tiết kiệm'];
    const sotaikhoan = {'Tiền gửi thanh toán': ['123456'], 'TIền gửi tiết kiệm' : ['024689', '135790', '000001']}
    const sodu = {'123456' : 50000, '024689': 80000, '135790': '100000', '000001': 5000000};
    const [accountType, setAccountType] = useState(taikhoan[0]);
    const [accountNumber, setAccountNumber] = useState(sotaikhoan[taikhoan[0]]);
    const [accountNumberValue, setAccountNumberValue] = useState(accountNumber[0]);
    const [money, setMoney] = useState(sodu[accountNumberValue]);

    useEffect(() => {
        getBankAccount()
        console.log(bankAccount)
    }, [])

    useEffect(() => {
        const mangTaiKhoan = sotaikhoan[accountType];
        setAccountNumber(mangTaiKhoan);
        let tien = sodu[mangTaiKhoan[0]];
        setMoney(tien);
    }, [accountType])

    useEffect(() => {
        let tien = sodu[accountNumberValue];
        setMoney(tien);
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
