import React from 'react'
import Title from '../component/title/title'
import {DateRangePicker} from 'react-date-range'

const transferHistory = () => {
    return (
        <div>
            <Title title="CHUYỂN TIỀN CHO NGƯỜI HƯỞNG Ở NGÂN HÀNG KHÁC"/>
            <div className="mt-4">
                <h5 className="text-success">THÔNG TIN NGƯỜI CHUYỂN</h5>
                <hr/>
                <DateRangePicker/>
            </div>
        </div>
    )
}

export default transferHistory
