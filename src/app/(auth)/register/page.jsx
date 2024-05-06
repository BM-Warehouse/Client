import Image from 'next/image';
import Link from 'next/link';

import RegisterImage from '@/assets/images/RegisterImage.png';

const RegisterPage = () => (
  <div className="w-full pt-10">
    <div className="flex h-[600px] justify-evenly bg-secondary">
      <div className="flex w-1/3 items-center">
        <Image src={RegisterImage} alt="Login Image" />
      </div>
      <div className="h-[95%] border-r border-gray-300" />
      <div className=" mt-10  w-1/3  ">
        <h1 className="mb-10 pt-10 text-center font-poppins text-3xl font-bold text-white">
          Register
        </h1>
        <div className="flex flex-col  justify-center">
          <input
            type="text"
            placeholder="Enter your name..."
            className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white 
            transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Enter your email..."
            className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white 
            transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter your password..."
            className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white 
            transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm password..."
            className="mb-5 border-b-1 border-gray-200 bg-transparent pb-2 text-white 
            transition-none placeholder:text-xl placeholder:text-gray-200 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-4 text-white">
          <button
            type="submit"
            className="my-5 w-fit self-center border border-gray-200 px-8 py-2 hover:bg-tertiary"
          >
            Register
          </button>

          <span>
            Already have an account?{' '}
            <Link href="/" className=" font-semibold underline underline-offset-1">
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

export default RegisterPage;
