'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import BWMLogo from '@/assets/images/LogoBMW2.png';

const Footer = () => (
  <div className="bg-primary py-16 text-white">
    <div className="footer-content mx-auto max-w-7xl px-5 md:px-10 lg:flex lg:items-center lg:justify-between">
      <div className="footer-left text-center lg:text-left">
        <Link href="#home" className="flex items-center justify-center lg:justify-start">
          <Image src={BWMLogo} width={50} height={50} alt="Logo BM Warehouse" />
          <span className="ml-3 font-josefin text-xl font-bold text-tertiary">B&M Warehouse</span>
        </Link>
        <p className="mt-3 text-sm">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
          tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.
        </p>
      </div>
      <div className="footer-right mt-10 flex justify-center space-x-5 lg:mt-0 lg:justify-end">
        <a href="#" className="btn bg-secondary text-white hover:bg-tertiary">
          Contact Us
        </a>
        <a href="#" className="btn bg-secondary text-white hover:bg-tertiary">
          Get Started
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
