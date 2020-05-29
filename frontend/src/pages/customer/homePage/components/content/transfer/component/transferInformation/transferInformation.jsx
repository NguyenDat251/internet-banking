import React from 'react'
import TextMoneyInput from '../textMoneyInput/textMoneyInput'
import SelectInput from '../../../component/selectInput/selectInput'

const TransferInformation = (props) => {
    return (
        <div>
            <TextMoneyInput title="Số tiền chuyển" onChange={props.onChange}/>
            <SelectInput title="Phí chuyển tiền" items={props.items} onChange={props.onChange}/>
        </div>
    )
}

export default TransferInformation
