/* eslint-disable react/no-unescaped-entities */

'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useInput from '@/hooks/useInput';
import useAuthUserStore from '@/store/authUserStore';

const LoginPage = () => {
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const { role } = useAuthUserStore();

  const { asyncSetAuthUser } = useAuthUserStore();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    console.log(username, password);
    try {
      await asyncSetAuthUser({ username, password });
      if (role === 'admin') {
        router.push('/dashboard');
      }
      if (role === 'user') {
        router.push('/products');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-10">
      <div className="flex h-[600px] justify-evenly bg-secondary">
        <div className="flex w-1/3 items-center">
          <Image
            src="/login.svg"
            width={500}
            height={500}
            alt="Login Image User illustrations by Storyset"
          />
        </div>
        <div className="h-[95%] border-r border-gray-300" />
        <div className=" mt-10  w-1/3  ">
          <h1 className="mb-10 pt-10 text-center font-poppins text-3xl font-bold text-white">
            Login
          </h1>
          <div className="flex flex-col  justify-center">
            <input
              type="text"
              placeholder="Enter your username..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white 
              transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={username}
              onChange={onUsernameChange}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Enter your password..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white 
              transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={password}
              onChange={onPasswordChange}
              required
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-y-4 text-white">
            <Link
              href="/"
              className="text-left font-semibold text-white underline underline-offset-1"
            >
              Forget Password?
            </Link>
            <button
              onClick={() => onLogin()}
              type="button"
              className={`my-5 w-fit self-center border border-gray-200 px-8 py-2 hover:bg-tertiary ${
                loading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <span>
              Don't have an account yet?{' '}
              <Link href="/register" className=" font-semibold underline underline-offset-1">
                Register Here
              </Link>
            </span>
            <Link href="/" className="mt-10 text-center">
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
