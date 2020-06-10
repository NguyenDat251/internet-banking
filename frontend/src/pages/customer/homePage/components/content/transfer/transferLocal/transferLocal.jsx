import React, { useEffect, useState } from 'react'
import Title from '../../component/title/title'
import SenderInformation from '../component/senderInformation/senderInformation'
import TransferInformation from '../component/transferInformation/transferInformation'
import InputWithSearch from '../component/inputWithSearch/inputWithSearch'
import TextInput from '../../component/textInput/textInput'
import "./transferLocal.scss"

const TransferLocal = () => {
    const SoTK = ["0123456789"];
    const phiChuyenTien = ["Người gửi trả", "Người chuyển trả"]
    const money = 500000;
    const receiver=[{'id': 12345, 'name': 'Lam'}, {'id': 12313, 'name': 'Jindo'}, {'id': 56456, 'name': 'asdasd'}, {'id': 1235, 'name': 'Khue'}]
    const [value , setValue] = useState();

    return (
        <div className="transferLocal">
            <form>
                <Title title="CHUYỂN TIỀN CHO NGƯỜI HƯỞNG Ở CÙNG NGÂN HÀNG"/>
                <div className="mt-4">
                    <h5 className="text-success">THÔNG TIN NGƯỜI CHUYỂN</h5>
                    <hr/>
                    <SenderInformation items={SoTK} money={money}/>
                </div>

                <div className="mt-5">
                    <h5 className="text-success">THÔNG TIN NGƯỜI HƯỞNG</h5>
                    <hr/>
                    <InputWithSearch title="Tìm kiếm"  items={receiver} onChange={e => setValue(e.target.value)}/>
                    <TextInput title="Số tài khoản" placeholder="Nhập số tài khoản"/>
                    <TextInput title="Tên người hưởng" placeholder="Tên người huởng" disabled={true}/>
                </div>

                <div className="mt-5">
                    <h5 className="text-success">NỘI DUNG CHUYỂN TIỀN</h5>
                    <hr/>
                    <TransferInformation items={phiChuyenTien}/>
                </div>
                <div className="mt-5 center-align">
                    <button className="btn btn-success float-center" type="submit">Xác nhận</button>
                </div>
            </form>
        </div>
    )
}

export default TransferLocal
