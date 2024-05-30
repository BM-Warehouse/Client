/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import BWMLogo from '@/assets/images/BMW_icon_N.png';
import CartIcon from '@/components/elements/CartIcon';
import ToggleTheme from '@/components/elements/ToggleTheme';
import Loading from '@/components/parts/Loading';
import useAuthUserStore from '@/store/authUserStore';

function Navbar() {
  const { asyncUnsetAuthUser, role, authUser } = useAuthUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    // await asyncUnsetAuthUser();

    try {
      setLoading(true);
      await asyncUnsetAuthUser();
      toast.success('Logout Success!');
      router.push('/login');
      setLoading(false);
    } catch (error) {
      toast.error('Logout Failed! Please try again!');
    }
  };
  // check role

  if (loading) {
    return <Loading />;
  }

  if (!role) {
    return <Loading />;
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
        <ToggleTheme />
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
              <Link href="/my-profile" className="justify-between">
                Profile
              </Link>
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
