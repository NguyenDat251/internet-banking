import React, { useState, useEffect } from 'react';
import Title from '../component/title/title';
import DatePicker from 'react-datepicker';
import './transferHistory.scss';

import 'react-datepicker/dist/react-datepicker.css';

const TransferHistory = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if(startDate>endDate){
        setStartDate(endDate)
    }
  }, [endDate])

  useEffect(() => {
    if(startDate>endDate){
        setEndDate(startDate)
    }
  }, [startDate])
  return (
    <div className="transferHistory">
      <Title title="TRA CỨU LỊCH SỬ GIAO DỊCH" />
      <div className="mt-4">
        <h5 className="text-success">LỊCH SỬ GIAO DỊCH</h5>
        <hr />
        <div className="row">
          <DatePicker
            className="col-10 ml-4"
            placeholderText="Ngày bắt đầu"
            onChange={(date) => setStartDate(date)}
            selected={startDate}
            dateFormat="dd-MM-yyyy"
          />
          <DatePicker
            className="col-10 "
            placeholderText="Ngày kết thúc"
            onChange={(date) => setEndDate(date)}
            selected={endDate}
            dateFormat="dd-MM-yyyy"
          />
          <div className="col-2"></div>
          <button className="btn btn-success">Xem lịch sử</button>
        </div>
      </div>
    </div>
  );
};

export default TransferHistory;
