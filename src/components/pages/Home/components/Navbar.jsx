import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';

import BWMLogo from '@/assets/images/LogoBMW2.png';

const Navbar = () => (
  <motion.div
    className="navbar top-0 z-20 bg-primary py-3"
    initial={{ opacity: 0, y: -50 }} // Initial animation states
    animate={{ opacity: 1, y: 0 }} // Animation to play when component mounts
    transition={{ type: 'spring', stiffness: 120, duration: 0.5 }} // Animation transition
  >
    <div className="navbar-start">
      <Link href="/" className="btn btn-ghost font-josefin text-xl">
        <Image src={BWMLogo} width={50} height={50} alt="Logo BM Warehouse" />
        <span className="font-josefin font-bold text-tertiary">B&M Warehouse</span>
      </Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li>
          <a href="#why-choose-us" className="hover:font-bold">
            Why Choose Us
          </a>
        </li>
        <li>
          <a href="#about-us" className="hover:font-bold">
            About Us
          </a>
        </li>
        <li>
          <a href="#faq" className="hover:font-bold">
            FAQ
          </a>
        </li>
        <li>
          <a href="#contact-us" className="hover:font-bold">
            Contact Us
          </a>
        </li>
      </ul>
    </div>
    <div className="navbar-end">
      <a className="btn hidden bg-secondary text-white hover:bg-tertiary lg:flex">
        <FiLogIn /> <span>Log In</span>
      </a>
      <details className="menu dropdown dropdown-end menu-lg lg:hidden">
        <summary className="btn m-1 bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </summary>
        <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
          <li>
            <a href="#why-choose-us">Why Choose Us</a>
          </li>
          <li>
            <a href="#about-us">About Us</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="#footer">Contact Us</a>
          </li>
          <li>
            <a className="btn mx-5 my-2 bg-secondary text-base text-white hover:bg-tertiary">
              <FiLogIn /> <span>Log In</span>
            </a>
          </li>
        </ul>
      </details>
    </div>
  </motion.div>
);

export default Navbar;
