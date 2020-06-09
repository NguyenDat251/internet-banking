import React, { useState } from 'react'
import Title from '../../component/title/title'
import SenderInformation from '../component/senderInformation/senderInformation'
import TransferInformation from '../component/transferInformation/transferInformation'
import TextInput from '../../component/textInput/textInput'
import SelectInput from '../../component/selectInput/selectInput'
import InputWithSearch from '../component/inputWithSearch/inputWithSearch'

const TransferAbroad = () => {
    const SoTK = ["0123456789"];
    const phiChuyenTien = ["Người gửi trả", "Người chuyển trả"]
    const receiver=[{'id': 12345, 'name': 'Lam'}, {'id': 12313, 'name': 'Jindo'}, {'id': 56456, 'name': 'asdasd'}, {'id': 1235, 'name': 'Khue'}]
    const money = 500000;
    const [value , setValue] = useState();

    const bankName = ["NaniBank", "AbcBank"];
    return (
        <div>
            <Title title="CHUYỂN TIỀN CHO NGƯỜI HƯỞNG Ở NGÂN HÀNG KHÁC"/>
            <div className="mt-4">
                <h5 className="text-success">THÔNG TIN NGƯỜI CHUYỂN</h5>
                <hr/>
                <SenderInformation items={SoTK} money={money}/>
            </div>

            <div className="mt-5">
                <h5 className="text-success">THÔNG TIN NGƯỜI HƯỞNG</h5>
                <hr/>
                <InputWithSearch title="Tìm kiếm"  items={receiver} onChange={e => setValue(e.target.value)}/>
                <TextInput title="Số tài khoản hưởng" placeholder="Nhập số tài khoản hưởng"/>
                <SelectInput title="Ngân hàng" items={bankName}/>
                
            </div>
            
            <div className="mt-5">
                <h5 className="text-success">NỘI DUNG CHUYỂN TIỀN</h5>
                <hr/>
                <TransferInformation items={phiChuyenTien}/>
            </div>
            <div className="mt-5 center-align">
                    <button className="btn btn-success float-center" type="submit">Xác nhận</button>
            </div>
        </div>
    )
}

export default TransferAbroad
