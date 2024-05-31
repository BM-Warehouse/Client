import React from 'react';

const OrderSteps = ({ status }) => {
  let steps;
  switch (status) {
    case 'WAIT FOR PAYMENT':
      steps = 0;
      break;
    case 'PACKING':
      steps = 1;
      break;
    case 'SENT':
      steps = 2;
      break;
    case 'DONE':
      steps = 3;
      break;
    case 'COMPLAIN':
      steps = 4;
      break;
    default:
      steps = 0;
      break;
  }
  return (
    <div className="ml-20 my-5 flex justify-center items-center min-w-60">
      <ul className="steps">
        <li className="step step-secondary">Payment</li>
        <li className={`step ${steps > 0 && 'step-secondary'}`}>Packing</li>
        <li className={`step ${steps > 1 && 'step-secondary'}`}>Sent</li>
        {/* eslint-disable-next-line no-nested-ternary */}
        <li className={`step ${steps === 3 ? 'step-secondary' : steps === 4 ? 'step-' : ''}`}>
          {steps === 4 ? 'Error' : 'Received'}
        </li>
      </ul>
    </div>
  );
};

export default OrderSteps;
