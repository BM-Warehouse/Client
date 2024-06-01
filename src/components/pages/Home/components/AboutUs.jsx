'use client';

import React from 'react';

import Image from 'next/image';

import BWMLogo from '@/assets/images/BMW_icon_new.png';

const AboutUs = () => (
  <div className="mt-10 flex w-full flex-col items-center">
    <h2 className="text-3xl font-bold text-secondary">About Us</h2>
    <div className="about-us-content mt-10 flex flex-col items-center xl:flex-row">
      <div className="about-us-left px-5 text-tertiary md:px-10 xl:w-1/2 xl:px-20">
        <p>
          BM WAREHOUSE is an organization created as the final project assignment for Rakamin
          Academy. We aim to revolutionize the warehousing industry by integrating cutting-edge
          technology with efficient logistics solutions. We strive to provide seamless warehousing
          services that optimize storage, streamline operations, and enhance overall supply chain
          management
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit
        </p>
      </div>
      <div className="about-us-right mt-10 flex w-1/2 items-center justify-center xl:mt-0">
        <Image src={BWMLogo} alt="Logo BM Warehouse" width={500} height={500} />
      </div>
    </div>
  </div>
);

export default AboutUs;
