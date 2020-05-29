import React from 'react';
import './textInput.scss';

const TextInput = (props) => {
  return (
    <div className="row mt-3 textInput">
      <div className="col-4 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-8">
        <input className="form-control" placeholder={props.placeholder} onChange={props.onChange} disabled={props.disabled}/>
      </div>
    </div>
  );
};

export default TextInput;
