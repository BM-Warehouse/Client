'use client';

import React from 'react';

import Image from 'next/image';

import BWMLogo from '@/assets/images/LogoBMW2.png';

const AboutUs = () => (
  <div className="mt-10 flex w-full flex-col items-center">
    <h2 className="text-3xl font-bold text-secondary">About Us</h2>
    <div className="about-us-content mt-10 flex flex-col items-center xl:flex-row">
      <div className="about-us-left px-5 text-tertiary md:px-10 xl:w-1/2 xl:px-20">
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit
        </p>
      </div>
      <div className="about-us-right mt-10 flex w-1/2 items-center justify-center xl:mt-0">
        <Image src={BWMLogo} alt="Logo BM Warehouse" />
      </div>
    </div>
  </div>
);

export default AboutUs;
