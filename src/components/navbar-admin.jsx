/* eslint-disable @next/next/no-img-element */

'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import BMWLogo from '@/assets/images/LogoBMW2.png';
import { adminRoute } from '@/lib/menu-route';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="mb-10 bg-primary pb-4 pt-2">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Image src={BMWLogo} alt="BMW Logo" width={60} height={60} className="rounded-lg" />
          </div>
          <div className="hidden md:block">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Tailwind CSS Navbar component"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center rounded-md p-2 text-secondary  
               focus:bg-tertiary focus:text-white focus:outline-none"
            >
              {isOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-20 z-20 flex min-h-screen w-full items-center justify-center bg-secondary md:hidden">
          <div className="space-y-10 px-2 pb-3 sm:px-3">
            {adminRoute.map((menuItem) => (
              <Link
                href={menuItem.href}
                key={menuItem.label}
                className="flex flex-col rounded-md text-center text-2xl font-medium text-white active:text-tertiary"
              >
                {menuItem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
