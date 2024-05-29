/* eslint-disable react/no-unescaped-entities */

'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';

import useInput from '@/hooks/useInput';
import BASE_URL from '@/lib/baseUrl';
import useAuthUserStore from '@/store/authUserStore';

const Login = ({accessToken}) => {
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const { role } = useAuthUserStore();
  const { asyncSetAuthUser } = useAuthUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');

  useEffect(() => {
    // if (role) {
    //   if (role === 'admin') {
    //     window.location.href = '/dashboard';
    //   } else if (role === 'user') {
    //     window.location.href = '/products';
    //   }
    // }
    console.log(accessToken);
  }, [role, router]);

  const onLogin = async () => {
    if (process.env.NEXT_PUBLIC_ENV === 'production' && !recaptchaToken) {
      toast.error('Please complete the reCAPTCHA');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (process.env.NEXT_PUBLIC_ENV === 'production') {
        response = await fetch(`${BASE_URL}/recaptcha/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password, recaptchaToken })
        });
      } else {
        // Mock response for development environment
        response = { ok: true, json: async () => ({}) };
      }

      const data = await response.json();
      if (response.ok) {
        await asyncSetAuthUser({ username, password });
        // toast.success('Login Success!');
      } else {
        toast.error(data.message || 'Login Failed! Please try again!');
      }
    } catch (error) {
      toast.error('Login Failed! Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="md:pb-20 md:pt-10">
      <div className="grid h-[1000px] grid-cols-1 place-items-center justify-items-center bg-secondary pb-10 md:flex md:h-[600px] md:grid-cols-3 md:justify-evenly">
        <Image
          src="/login.svg"
          width={500}
          height={500}
          alt="Login Image User illustrations by Storyset"
          className="justify-self-center"
        />

        <div className="hidden h-[95%] border-r border-gray-300 md:block" />
        <div>
          <h1 className="mb-10 pt-10 text-center font-poppins text-3xl font-bold text-white">
            Login
          </h1>
          <div className="flex flex-col justify-center">
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
          {process.env.NEXT_PUBLIC_ENV === 'production' && (
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onRecaptchaChange}
            />
          )}
          <div className="flex flex-col gap-y-4 text-white">
            <Link
              href="/"
              className="text-left font-semibold text-white underline underline-offset-1"
            >
              Forget Password?
            </Link>
            <button
              onClick={onLogin}
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
              <Link href="/register" className="font-semibold underline underline-offset-1">
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

export default Login;
