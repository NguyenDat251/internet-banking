import React from 'react';
import './textOutput.scss';

const TextOutput = (props) => {
  return (
    <div className="row mt-3 textOutput">
      <div className="col-4 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-8">
        <span>{props.money}{" VND"}</span>
      </div>
    </div>
  );
};

export default TextOutput;
