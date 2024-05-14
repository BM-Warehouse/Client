/* eslint-disable max-len */

'use client';

import React from 'react';

import Image from 'next/image';

import Ellipse from '@/assets/images/Ellipse.png';
import HumanTalk from '@/assets/images/HumanTalk.png';

const Hero = () => (
  <div className="mt-24 w-full">
    <div className="hero-content mt-10 flex flex-col-reverse items-center justify-between pl-0 lg:flex-row">
      <div className="hero-content-left relative mt-10 lg:mt-0">
        <Image src={Ellipse} alt="Ellipse" />
        <div className="text-content z-2 absolute left-10 top-14 max-w-[20rem] bg-transparent text-white md:left-20 md:top-28 md:max-w-[30rem]">
          <h1 className="text-2xl font-bold md:text-4xl">Lorem Ipsum</h1>
          <p className="mt-3 text-sm md:mt-10 md:text-base">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit
          </p>
          <button className="btn btn-outline mt-3 w-40 text-white md:mt-10">Get Started</button>
        </div>
      </div>
      <div className="hero-content-right xl:mr-20">
        <Image
          src={HumanTalk}
          alt="Human Talking"
          className="h-52 w-52 md:h-96 md:w-96 xl:h-full xl:w-full"
        />
      </div>
    </div>
    <div className="hero-additional-info mt-20 grid w-full grid-cols-3 place-content-center place-items-center gap-4 bg-secondary py-8 text-xl font-bold text-white md:text-2xl">
      <span className="flex flex-col items-center justify-center">
        <h2>Counter 1</h2>
        <h2>600+</h2>
      </span>
      <span className="flex flex-col items-center justify-center">
        <h2>Clients</h2>
        <h2>50+</h2>
      </span>
      <span className="flex flex-col items-center justify-center">
        <h2>Clients</h2>
        <h2>50+</h2>
      </span>
    </div>
  </div>
);

export default Hero;
