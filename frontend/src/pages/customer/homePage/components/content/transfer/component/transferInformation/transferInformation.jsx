import React from 'react'
import TextMoneyInput from '../textMoneyInput/textMoneyInput'
import SelectInput from '../../../component/selectInput/selectInput'
import TextAreaInput from '../textAreaInput/textAreaInput'
import { useState, useEffect } from 'react'

const TransferInformation = (props) => {
    const soTien = props.soTien && props.soTien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    const [value, setValue] = useState(soTien);
    const handleMoneyOnChange = (e) => {
        const re = /^[0-9\b]+$/;
        var money = e.target.value
        money = money.split(',').join('');
        if (money === '' || re.test(money)) {
           setValue(money.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
        }
    }
    
    const setMoney = (e) => {
        const moneyValue = e.target.value;
        props.setSoTien(Number(moneyValue.split(',').join('')))
    }

    return (
        <div>
            <TextMoneyInput title="Số tiền chuyển" value={value} onChange={e => handleMoneyOnChange(e)} onBlur={(e) => setMoney(e)}/>
            <TextAreaInput title="Nội dung chuyển" value={props.noiDung} placeholder="Nhập nội dung chuyển tiền" onChange={e => props.setNoiDung(e.target.value)}/>
            <SelectInput title="Phí chuyển tiền" value={props.nguoiTraPhi} items={props.items} onChange={(e=>props.setNguoiTraPhi(e.target.value))}/>
        </div>
    )
}

export default TransferInformation
