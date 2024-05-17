/* eslint-disable max-len */

'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import Ellipse from '@/assets/images/Ellipse.png';
import HumanTalk from '@/assets/images/HumanTalk.png';

const Hero = () => (
  <div className="mt-24 w-full">
    <div className="hero-content mt-10 flex flex-col-reverse items-center justify-between pl-0 lg:flex-row">
      <motion.div
        className="hero-content-left relative mt-10 lg:mt-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Image src={Ellipse} alt="Ellipse" />
        <motion.div
          className="text-content z-2 absolute left-10 top-14 max-w-[20rem] bg-transparent text-white md:left-20 md:top-28 md:max-w-[30rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="text-2xl font-bold md:text-4xl">Baby & Mom Warehouse</h1>
          <p className="mt-3 text-sm md:mt-10 md:text-base">
            BM WAREHOUSE is an organization created as the final project assignment for Rakamin
            Academy. We aim to revolutionize the warehousing industry by integrating cutting-edge
            technology with efficient logistics solutions. We strive to provide seamless warehousing
            services that optimize storage, streamline operations, and enhance overall supply chain
            management
          </p>
          <Link href="/register">
            <button className="btn btn-outline mt-3 w-40 text-white md:mt-10">Get Started</button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-content-right xl:mr-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={HumanTalk}
          alt="Human Talking"
          className="h-52 w-52 md:h-96 md:w-96 xl:h-full xl:w-full"
        />
      </motion.div>
    </div>
    <motion.div
      className="hero-additional-info mt-20 grid w-full grid-cols-3 place-content-center place-items-center gap-4 bg-secondary py-8 text-xl font-bold text-white md:text-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    >
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
    </motion.div>
  </div>
);

export default Hero;
