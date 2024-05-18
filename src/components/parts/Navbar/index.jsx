/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BWMLogo from '@/assets/images/LogoBMW2.png';
import CartIcon from '@/components/elements/CartIcon';
import useAuthUserStore from '@/store/authUserStore';

function Navbar() {
  const { asyncUnsetAuthUser, role, authUser } = useAuthUserStore();
  const router = useRouter();

  const onLogout = async () => {
    await asyncUnsetAuthUser();

    router.push('/login');
  };
  // check role

  if (!role) {
    return null;
  }
  return (
    <div className="navbar fixed top-0 z-20 bg-primary py-3">
      <div className="flex-1">
        <Link href="/products" className="btn btn-ghost font-josefin text-xl">
          <Image src={BWMLogo} width={50} height={50} alt="Logo BM Warehouse" />
          <span className="font-josefin font-bold text-tertiary">B&M Warehouse</span>
        </Link>
      </div>
      <div className="flex-none">
        {role === 'user' && <CartIcon />}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={authUser.avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-primary p-2 text-secondary shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>

            <li>
              <button onClick={() => onLogout()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
