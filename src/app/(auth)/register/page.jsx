/* eslint-disable no-alert */

'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { register } from '@/fetching/auth';
import useInput from '@/hooks/useInput';

const RegisterPage = () => {
  const [email, onEmailChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [fullName, onFullNameChange] = useInput('');
  const [phone, onPhoneChange] = useInput('');
  const [address, onAddressChange] = useInput('');
  const [gender, onGenderChange] = useInput('');
  const [birthdate, onBirthdateChange] = useInput('');
  const [avatar, onAvatarChange] = useInput('');

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      await register({
        email,
        username,
        password,
        fullName,
        phone,
        address,
        gender,
        birthdate,
        avatar,
        role: 'User'
      });
      alert('Registration successful! Please log in.');
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:pt-10">
      <div className="flex h-full flex-col justify-evenly bg-secondary pb-10 md:h-[600px] md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/3 md:justify-start">
          <Image src="/register.svg" width={500} height={500} alt="Register Image by StorySet" />
        </div>
        <div className="hidden h-[95%] border-r border-gray-300 md:block" />
        <div className="mt-10 w-full px-4 md:w-1/3 md:px-0">
          <h1 className="mb-10 pt-10 text-center font-poppins text-3xl font-bold text-white">
            Register
          </h1>
          <div className="flex flex-col justify-center">
            <input
              type="email"
              placeholder="Enter your email..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={email}
              onChange={onEmailChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Enter your username..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={username}
              onChange={onUsernameChange}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Enter your password..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={password}
              onChange={onPasswordChange}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Confirm password..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Enter your full name..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={fullName}
              onChange={onFullNameChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Enter your phone number..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={phone}
              onChange={onPhoneChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Enter your address..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={address}
              onChange={onAddressChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Enter your gender..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={gender}
              onChange={onGenderChange}
              required
              disabled={loading}
            />
            <input
              type="date"
              placeholder="Enter your birthdate..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={birthdate}
              onChange={onBirthdateChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Enter your avatar URL..."
              className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
              value={avatar}
              onChange={onAvatarChange}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-y-4 text-white">
            <button
              type="submit"
              className={`my-5 w-fit self-center border border-gray-200 px-8 py-2 hover:bg-tertiary ${
                loading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={onRegister}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <span>
              Already have an account?{' '}
              <Link href="/login" className="font-semibold underline underline-offset-1">
                Login Here
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

export default RegisterPage;
