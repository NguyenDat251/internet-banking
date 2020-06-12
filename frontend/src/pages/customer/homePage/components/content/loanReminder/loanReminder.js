import React, { useState, useEffect } from 'react'
import Title from '../component/title/title'

const LoanReminder = () => {

    return (
        <div className="contentContainer">
            <Title title="THÔNG TIN NHẮC NỢ"/>
            <div className="inputContainer mt-4">
                <h5 className="text-success">DANH SÁCH NHẮC NỢ</h5>
                <hr/>                
            </div>
        </div>
    )
}
export default (LoanReminder)
