/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import BWMLogo from '@/assets/images/LogoBMW2.png';

function Navbar() {
  return (
    <div className="navbar fixed top-0 z-20 bg-primary py-3">
      <div className="flex-1">
        <Link href="/products" className="btn btn-ghost font-josefin text-xl">
          <Image src={BWMLogo} width={50} height={50} alt="Logo BM Warehouse" />
          <span className="font-josefin font-bold text-tertiary">B&M Warehouse</span>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <div className="indicator">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge indicator-item badge-sm">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-primary shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-primary p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>

            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
