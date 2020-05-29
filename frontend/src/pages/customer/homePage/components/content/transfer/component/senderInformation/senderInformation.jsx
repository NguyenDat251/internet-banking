import React from 'react'
import SelectInput from "../../../component/selectInput/selectInput"
import TextMoneyOutput from '../../../component/textMoneyOutput/textMoneyOutput'

const SenderInformation = (props) => {
    return (
        <div>
            <SelectInput title={"Tài khoản nguồn"} items={props.items}/>
            <TextMoneyOutput title={"Số dư khả dụng"} money={500000}/>
        </div>  
    )
}

export default SenderInformation
