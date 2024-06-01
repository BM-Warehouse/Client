/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */

'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { FaHome, FaInfoCircle, FaQuestionCircle, FaPhone, FaThumbsUp } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 }
};

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMoveToSection = (index) => {
    fullpage_api.moveTo(index);
    setIsVisible(false);
  };

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="sidebar-container">
      {!isVisible && (
        <motion.button
          onClick={toggleSidebar}
          className="fixed left-4 top-1/2 z-50 -translate-y-1/2 rounded-md bg-transparent p-2 text-sky-300"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          transition={{ duration: 0.5 }}
        >
          <MdKeyboardArrowRight size={32} />
        </motion.button>
      )}
      <motion.div
        className={`sidebar fixed left-0 top-0 z-40 flex h-full w-16 flex-col items-center justify-between bg-secondary p-4 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out`}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={sidebarVariants}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={toggleSidebar}
          className="absolute right-0 top-1/2 z-50 -translate-y-1/2 translate-x-full rounded-md bg-transparent p-2 text-sky-300"
        >
          <MdKeyboardArrowLeft size={32} />
        </button>
        <ul className="flex h-full flex-col items-center justify-evenly text-gray-50">
          <li data-menuanchor="home">
            <button onClick={() => handleMoveToSection(1)} className="sidebar-btn" title="Home">
              <FaHome />
            </button>
          </li>
          <li data-menuanchor="about-us">
            <button onClick={() => handleMoveToSection(2)} className="sidebar-btn" title="About Us">
              <FaInfoCircle />
            </button>
          </li>
          <li data-menuanchor="why-choose-us">
            <button
              onClick={() => handleMoveToSection(3)}
              className="sidebar-btn"
              title="Why Choose Us"
            >
              <FaThumbsUp />
            </button>
          </li>
          <li data-menuanchor="faq">
            <button onClick={() => handleMoveToSection(4)} className="sidebar-btn" title="FAQ">
              <FaQuestionCircle />
            </button>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Sidebar;
