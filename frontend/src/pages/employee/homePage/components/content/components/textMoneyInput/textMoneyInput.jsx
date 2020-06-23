import React from 'react';
import './textMoneyInput.scss'

const TextMoneyInput = (props) => {
  return (
    <div className="row mt-3 textMoneyInput">
      <div className="col-3 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-9">
        <div className="input-group">
        <input type="number" className="form-control" placeholder="Nhập số tiền" {...props} onChange={props.onChange}></input>
            <div className="input-group-append">
                <span className="input-group-text">VND</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TextMoneyInput;
