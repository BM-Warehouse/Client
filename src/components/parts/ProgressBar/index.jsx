import React from 'react';

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-primary rounded-full h-1">
    <div className="bg-secondary h-1 rounded-full" style={{ width: `${progress}%` }}>
      {' '}
    </div>
  </div>
);

export default ProgressBar;
