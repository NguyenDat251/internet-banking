import React from 'react';
import './textInput.scss';

const TextInput = (props) => {
  return (
    <div className="row mt-3 textInput">
      <div className="col-4 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-8">
        <input {...props} className="form-control"/>
      </div>
    </div>
  );
};

export default TextInput;
