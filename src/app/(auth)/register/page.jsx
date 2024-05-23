/* eslint-disable react/no-unescaped-entities */

'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-hot-toast';

import { register } from '@/fetching/auth';
import useInput from '@/hooks/useInput';
import BASE_URL from '@/lib/baseUrl';

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
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isStepOneValid, setIsStepOneValid] = useState(false);
  const [isStepTwoValid, setIsStepTwoValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsStepOneValid(
      email.trim() !== '' &&
        username.trim() !== '' &&
        password.trim() !== '' &&
        confirmPassword.trim() !== ''
    );
  }, [email, username, password, confirmPassword]);

  useEffect(() => {
    setIsStepTwoValid(
      fullName.trim() !== '' &&
        phone.trim() !== '' &&
        address.trim() !== '' &&
        gender.trim() !== '' &&
        birthdate.trim() !== ''
    );
  }, [fullName, phone, address, gender, birthdate]);

  const avatar =
    gender === 'Male'
      ? 'https://res.cloudinary.com/denyah3ls/image/upload/v1716033038/profile-avatar_z4huvm.jpg'
      : 'https://res.cloudinary.com/denyah3ls/image/upload/v1716036464/female-profile_hgzl8v.jpg';

  const onRegister = async () => {
    if (password !== confirmPassword) {
      toast.error(`Passwords don't match!`);
      return;
    }

    if (process.env.NEXT_PUBLIC_ENV === 'production' && !recaptchaToken) {
      toast.error('Please complete the reCAPTCHA');
      return;
    }

    setLoading(true);
    try {
      if (process.env.NEXT_PUBLIC_ENV === 'production') {
        const response = await fetch(`${BASE_URL}/recaptcha/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ recaptchaToken })
        });

        const data = await response.json();
        if (!response.ok) {
          toast.error(data.message || 'Registration failed: Invalid reCAPTCHA');
          setLoading(false);
          return;
        }
      }

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

      toast.success('Registration Successful! Please Login!');
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
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
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
        required
        disabled={loading}
      >
        <option disabled className="text-gray-300">
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
          {step === 2 && process.env.NEXT_PUBLIC_ENV === 'production' && (
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={onRecaptchaChange}
            />
          )}
          <div className="flex justify-center gap-10 text-white">
            {step === 1 ? (
              <button
                type="button"
                className={`w-fit self-center border border-gray-200 px-8 py-2 hover:bg-tertiary ${
                  loading || !isStepOneValid ? 'cursor-not-allowed opacity-50' : ''
                }`}
                onClick={() => setStep(2)}
                disabled={loading || !isStepOneValid}
              >
                Next
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={`w-fit self-center border border-gray-200 px-8 py-2 hover:bg-tertiary ${
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
                    loading || !isStepTwoValid ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  onClick={onRegister}
                  disabled={loading || !isStepTwoValid}
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
