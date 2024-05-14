'use client';

import React from 'react';

import { MdWarehouse } from 'react-icons/md';

const WhyChooseUs = () => (
  <div className="mt-10 flex w-full flex-col items-center">
    <h2 className="text-3xl font-bold text-secondary">Why Choose Us?</h2>
    <div className="why-choose-us-content mx-3 mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:mx-10 xl:grid-cols-3 xl:gap-24">
      <div className="card-why-us flex h-[28rem] w-full flex-col items-center justify-center rounded-lg bg-secondary px-10 text-white">
        <div className="img">
          <MdWarehouse className="text-8xl" />
        </div>
        <div className="desc mt-3">
          <h5 className="mb-2 text-lg font-bold">Lorem Ipsum</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
          </p>
        </div>
      </div>
      <div className="card-why-us flex h-[28rem] w-full flex-col items-center justify-center rounded-lg bg-secondary px-10 text-white">
        <div className="img">
          <MdWarehouse className="text-8xl" />
        </div>
        <div className="desc mt-3">
          <h5 className="mb-2 text-lg font-bold">Lorem Ipsum</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
          </p>
        </div>
      </div>
      <div className="card-why-us flex h-[28rem] w-full flex-col items-center justify-center rounded-lg bg-secondary px-10 text-white">
        <div className="img">
          <MdWarehouse className="text-8xl" />
        </div>
        <div className="desc mt-3">
          <h5 className="mb-2 text-lg font-bold">Lorem Ipsum</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore. Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WhyChooseUs;
