import React, {useState, useEffect } from 'react'
import SenderInformation from '../../../component/senderInformation/senderInformation'
import TransferInformation from '../../../component/transferInformation/transferInformation'
import InputWithSearch from '../../../component/inputWithSearch/inputWithSearch'
import TextInput from '../../../../component/textInput/textInput'
import "./transferForm.scss"
import { connect } from 'react-redux'

const TransferForm = (props) => {
    const credit_account = props.bankAccount.credit_account[0];
    const SoTK = [credit_account.credit_number];
    const phiChuyenTien = ["Người chuyển trả", "Người nhận trả"]
    const money = credit_account.balance;
    const receiver=[{'id': 12345, 'name': 'Lam'}, {'id': 12313, 'name': 'Jindo'}, {'id': 56456, 'name': 'asdasd'}, {'id': 1235, 'name': 'Khue'}]
    const [value , setValue] = useState();

    const handleForSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="transferForm">
            <form onSubmit={handleForSubmit}>    
                <SenderInformation items={SoTK} money={money}/>
                <div className="mt-5">
                    <h5 className="text-success">THÔNG TIN NGƯỜI HƯỞNG</h5>
                    <hr/>
                    <InputWithSearch title="Tìm kiếm"  items={receiver} onChange={e => setValue(e.target.value)}/>
                    <TextInput title="Số tài khoản" placeholder="Nhập số tài khoản" onChange={(e) => props.setSoTaiKhoan(e.target.value)}/>
                    <TextInput title="Tên người hưởng" placeholder="Tên người huởng" disabled={true}/>
                </div>

                <div className="mt-5">
                    <h5 className="text-success">NỘI DUNG CHUYỂN TIỀN</h5>
                    <hr/>
                    <TransferInformation {...props} items={phiChuyenTien}/>
                </div>
                <div className="mt-5 center-align">
                    <button className="btn btn-success float-center" type="submit">Xác nhận</button>
                </div>
            </form>
        </div>
    )
}

export default TransferForm
