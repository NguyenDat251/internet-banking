import React,{ useState } from 'react';
import DatePicker from 'react-datepicker';
import './dateInput.scss';

const DateInput = (props) => {
  const [date, setDate] = useState(new Date())
  return (
    <div className="row mt-3 dateInput">
      <div className="col-3 align-self-center text-right padding-10">
        <h6>{props.title}</h6>
      </div>
      <div className="col-7 padding-10">
      <DatePicker
            className="form-control"
            placeholderText="Ngày tháng năm sinh"
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd-MM-yyyy"
          />
      </div>
    </div>
  );
};

export default DateInput;
