import React, { useState, useEffect } from 'react'
import Title from '../component/title/title'
import SelectInput from '../component/selectInput/selectInput'
import TextOutput from '../component/textOutput/textOutput'

const BankAccount = (props) => {
    const taikhoan = ['Tiền gửi thanh toán', 'TIền gửi tiết kiệm'];
    const sotaikhoan = {'Tiền gửi thanh toán': ['123456'], 'TIền gửi tiết kiệm' : ['024689', '135790', '000001']}
    const sodu = {'123456' : 50000, '024689': 80000, '135790': '100000', '000001': 5000000};
    const [accountType, setAccountType] = useState(taikhoan[0]);
    const [accountNumber, setAccountNumber] = useState(sotaikhoan[taikhoan[0]]);
    const [accountNumberValue, setAccountNumberValue] = useState(accountNumber[0]);
    const [money, setMoney] = useState(sodu[accountNumberValue]);

    useEffect(() => {
        const mangTaiKhoan = sotaikhoan[accountType];
        setAccountNumber(mangTaiKhoan);
        const tien = sodu[mangTaiKhoan[0]];
        setMoney(tien);
    }, [accountType])

    useEffect(() => {
        const tien = sodu[accountNumberValue];
        setMoney(tien);
    }, [accountNumberValue])
    return (
        <div className="contentContainer">
            <Title title="DANH SÁCH TÀI KHOẢN"/>
            <SelectInput title="Loại tài khoản" items={taikhoan} onChange={e => setAccountType(e.target.value)}/>
            <SelectInput title="Chọn tài khoản" items={accountNumber} onChange={e => setAccountNumberValue(e.target.value)}/>
            <TextOutput title="Số dư" money={money}/>
        </div>
    )
}

export default BankAccount
