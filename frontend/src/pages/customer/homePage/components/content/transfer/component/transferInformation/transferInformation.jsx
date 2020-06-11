import React from 'react'
import TextMoneyInput from '../textMoneyInput/textMoneyInput'
import SelectInput from '../../../component/selectInput/selectInput'
import TextAreaInput from '../textAreaInput/textAreaInput'

const TransferInformation = (props) => {
    return (
        <div>
            <TextMoneyInput title="Số tiền chuyển" value={props.soTien} onChange={e => props.setSoTien(e.target.value)}/>
            <TextAreaInput title="Nội dung chuyển" value={props.noiDung} placeholder="Nhập nội dung chuyển tiền" onChange={e => props.setNoiDung(e.target.value)}/>
            <SelectInput title="Phí chuyển tiền" value={props.nguoiTraPhi} items={props.items} onChange={e=>props.setNguoiTraPhi(e.target.value)}/>
        </div>
    )
}

export default TransferInformation
