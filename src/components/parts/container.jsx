import React from 'react';

const Container = ({ children }) => (
  <div className="mx-4 max-w-7xl rounded-xl border border-secondary p-10 md:mx-6 lg:mx-10 xl:mx-auto ">
    {children}
  </div>
);

export default Container;
