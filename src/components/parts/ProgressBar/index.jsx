import React from 'react';

const ProgressBar = ({ progress }) => (
  <div className="flex flex-col items-center">
    <div className="w-full bg-primary rounded-full h-1">
      <div className="bg-secondary h-1 rounded-full w-full" style={{ width: `${progress}%` }}>
        {' '}
      </div>
    </div>
    <div className="text-secondary">{progress} %</div>
  </div>
);

export default ProgressBar;
