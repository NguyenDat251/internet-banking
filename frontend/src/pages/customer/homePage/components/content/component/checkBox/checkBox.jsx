import React from 'react';
import './checkBox.scss';

const CheckBox = (props) => {
  return (
    <div className="row mt-3 checkBox">
      <div className="col-4 text-right align-self-center">
        <input type="checkbox" {...props}/>
      </div>
      <div className="col-8">
        <label>{props.label}</label>
      </div>
    </div>
  );
};

export default CheckBox;
