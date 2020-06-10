import React from 'react';
import './textAreaInput.scss';

const TextAreaInput = (props) => {
  return (
    <div className="row mt-3 textInput">
      <div className="col-4 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-8">
        <textarea {...props} className="form-control"/>
      </div>
    </div>
  );
};

export default TextAreaInput;
