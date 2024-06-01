'use client';

import React from 'react';

import { FaTools } from 'react-icons/fa';
import { FaClipboardCheck, FaGears } from 'react-icons/fa6';

const WhyChooseUs = () => (
  <div className="mt-10 flex w-full flex-col items-center">
    <h2 className="text-3xl font-bold text-secondary">Why Choose Us?</h2>
    <div className="why-choose-us-content mx-3 mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:mx-10 xl:grid-cols-3 xl:gap-24">
      <div className="card-why-us flex h-[28rem] w-full flex-col items-center justify-center rounded-lg bg-secondary px-10 text-white">
        <div className="img">
          {/* <MdWarehouse className="text-8xl" /> */}
          <FaGears className="text-8xl" />
        </div>
        <div className="desc mt-3">
          <h5 className="mb-2 text-lg font-bold">Efficient</h5>
          <p>
            Our automation system improves operational efficiency, reduces costs, and ensures
            optimal inventory accuracy for your business success.
          </p>
        </div>
      </div>
      <div className="card-why-us flex h-[28rem] w-full flex-col items-center justify-center rounded-lg bg-secondary px-10 text-white">
        <div className="img">
          <FaTools className="text-8xl" />
        </div>
        <div className="desc mt-3">
          <h5 className="mb-2 text-lg font-bold">Services Support</h5>
          <p>
            24/7 customer support ensures all your warehousing issues are handled quickly, ensuring
            smooth operations and maximum satisfaction.
          </p>
        </div>
      </div>
      <div className="card-why-us flex h-[28rem] w-full flex-col items-center justify-center rounded-lg bg-secondary px-10 text-white">
        <div className="img">
          <FaClipboardCheck className="text-8xl" />
        </div>
        <div className="desc mt-3">
          <h5 className="mb-2 text-lg font-bold">Easy Integration</h5>
          <p>
            Seamless integration with existing systems, real-time reporting, and intelligent
            analytics help you make informed and fast business decisions.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WhyChooseUs;
