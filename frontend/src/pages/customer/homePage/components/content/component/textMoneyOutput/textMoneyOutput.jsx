import React from 'react';
import './textMoneyOutput.scss';

const TextOutput = (props) => {
  const money = props.money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return (
    <div className="row mt-3 textMoneyOutput">
      <div className="col-4 text-right align-self-center">
        <h6>{props.title}</h6>
      </div>
      <div className="col-8">
        <span className="align-text-top">{money}{" VND"}</span>
      </div>
    </div>
  );
};

export default TextOutput;
