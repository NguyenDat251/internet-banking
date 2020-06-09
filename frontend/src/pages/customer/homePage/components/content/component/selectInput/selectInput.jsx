import React from 'react';
import './selectInput.scss';

const SelectInput = (props) => {
  return (
    <div className="row mt-3 selectInput">
      <div className="col-4 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-8">
        <select className="form-control input-sm" onChange={props.onChange}>
            {props.items ? props.items.map((item,key) =>
                <option key={key}>{item}</option>
            ) : null}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
