import React from 'react'
import TextMoneyInput from '../textMoneyInput/textMoneyInput'
import SelectInput from '../../../component/selectInput/selectInput'
import TextAreaInput from '../textAreaInput/textAreaInput'

const TransferInformation = (props) => {
    return (
        <div>
            <TextMoneyInput title="Số tiền chuyển" onChange={props.onChange}/>
            <TextAreaInput title="Nội dung chuyển" placeholder="Nhập nội dung chuyển tiền"/>
            <SelectInput title="Phí chuyển tiền" items={props.items} onChange={props.onChange}/>
        </div>
    )
}

export default TransferInformation
