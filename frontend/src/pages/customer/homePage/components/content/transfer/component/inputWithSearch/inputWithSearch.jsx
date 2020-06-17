import React from 'react';
import './inputWithSearch.scss';

const InputWithSearch = (props) => {
  return (
    <div className="row mt-3 selectInput">
      <div className="col-4 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-8">
        <input list="somethingelse" className="form-control input-sm" placeholder="Nhập tên người hưởng, tên gợi nhớ, họ tên" {...props}/>
        <datalist id="somethingelse" >
          {props.items
            ? props.items.map((item) =><option key={item.remind_id} value={item.credit_number}>{`Tên gợi nhớ: ${item.remind_name} - \nNgân hàng: ${item.partner_code}`}</option>)
            : null}
        </datalist>
      </div>
    </div>
  );
};

export default InputWithSearch;
