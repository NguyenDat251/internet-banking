import React, { useState } from 'react'
import HeaderHomePage from '../loginPage/components/header/header'
import './forgotPassword.component.scss'
import TextInput from '../../customer/homePage/components/content/component/textInput/textInput'

const ForgotPassword = () => {
    const [error, setError] = useState();
    const [userName, setUsername] = useState();
    const [idNumber, setIdNumber] = useState()

    const onhandleSubmit=(e) => {
        e.preventDefault();
        if(!userName){
            setError("Vui lòng nhập tên truy cập")
            return;
        }
        if(!idNumber){
            setError("Vui lòng nhập số CMND")
            return; 
        }
    }
    return (
        <div className="forgot-password">
            <HeaderHomePage/>
            <div className="card custom mt-5">
                <div className="background-black">
                    <span className="text-white font-weight-bolder">QUÊN MẬT KHẨU</span>
                    <hr/>
                </div>
                <form onSubmit={(e) => onhandleSubmit(e)}>
                    <div className="mt-4 form-group">
                        <TextInput title="Tên truy cập" placeholder="Nhập tên truy cập" onChange={e => setUsername(e.target.value)}/>
                        <TextInput title="Số CMND" placeholder="Nhập số CMND" onChange={e => setIdNumber(e.target.value)}/>
                    </div>
                    {error && 
                    <div className="mt-3 center-align">
                        <span className="text-danger">{error}</span>
                    </div>}
                    <div className="mt-4 center-align">
                        <button
                        className="btn btn-success float-center"
                        type="submit">
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
