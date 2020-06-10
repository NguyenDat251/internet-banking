import React from 'react';
import './textOutput.scss';

const TextOutput = (props) => {
  return (
    <div className="row mt-3 textMoneyOutput">
      <div className="col-4 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-8">
        <span className="align-text-top">{props.text}</span>
      </div>
    </div>
  );
};

export default TextOutput;
