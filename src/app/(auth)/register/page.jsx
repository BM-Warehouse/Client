/* eslint-disable no-alert */

'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { register } from '@/fetching/auth';
import useInput from '@/hooks/useInput';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('Male');
  const [email, onEmailChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [fullName, onFullNameChange] = useInput('');
  const [phone, onPhoneChange] = useInput('');
  const [address, onAddressChange] = useInput('');
  const [birthdate, onBirthdateChange] = useInput('');
  // const [avatar, onAvatarChange] = useInput('');
  let avatar = '';
  if (gender === 'Male') {
    avatar =
      'https://res.cloudinary.com/denyah3ls/image/upload/v1716033038/profile-avatar_z4huvm.jpg';
  } else {
    avatar =
      'https://res.cloudinary.com/denyah3ls/image/upload/v1716036464/female-profile_hgzl8v.jpg';
  }

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onRegister = async () => {
    if (password !== confirmPassword) {
      alert(`Password doesn't match!`);
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
        role: 'user'
      });
      router.push('/login');
      alert('Registration successful! Please log in.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderStepOne = () => (
    <>
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
    </>
  );

  const renderStepTwo = () => (
    <>
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
        type="tel"
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
      {/* <input
        type="text"
        placeholder="Enter your gender..."
        className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
        value={gender}
        onChange={onGenderChange}
        required
        disabled={loading}
      /> */}
      <select
        onChange={(e) => setGender(e.target.value)}
        className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
      >
        <option disabled selected className="text-gray-300">
          Choose your gender...
        </option>
        <option className="text-secondary">Male</option>
        <option className="text-secondary">Female</option>
      </select>
      <input
        type="date"
        placeholder="Enter your birthdate..."
        className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
        value={birthdate}
        onChange={onBirthdateChange}
        required
        disabled={loading}
      />
      {/* <input
        type="text"
        placeholder="Enter your avatar URL..."
        className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
        value={avatar}
        onChange={onAvatarChange}
        disabled={loading}
      /> */}
    </>
  );

  return (
    <div className="w-full lg:pb-20 lg:pt-10">
      <div className="flex h-full flex-col justify-evenly bg-secondary pb-10 md:h-[700px] md:flex-row">
        <div className="flex w-full items-center justify-center md:w-1/3 md:justify-start">
          <Image src="/register.svg" width={500} height={500} alt="Register Image by StorySet" />
        </div>
        <div className="hidden h-[95%] border-r border-gray-300 md:block" />
        <div className="mt-10 w-full px-4 md:w-1/3 md:px-0">
          <h1 className="mb-10 pt-10 text-center font-poppins text-3xl font-bold text-white">
            Register
          </h1>
          <div className="flex flex-col justify-center">
            {step === 1 ? renderStepOne() : renderStepTwo()}
          </div>
          <div className="flex justify-center gap-10 text-white">
            {step === 1 ? (
              <button
                type="button"
                className={` w-fit self-center border border-gray-200 px-8 py-2 hover:bg-tertiary ${
                  loading ? 'cursor-not-allowed opacity-50' : ''
                }`}
                onClick={() => setStep(2)}
                disabled={loading}
              >
                Next
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={` w-fit self-center border border-gray-200 px-8 py-2 hover:bg-tertiary ${
                    loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </button>
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
              </>
            )}
          </div>
          <div className="flex flex-col text-white">
            <span className="mt-10">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold underline underline-offset-1">
                Login Here
              </Link>
            </span>
            <Link href="/" className="mt-20 text-center">
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
