import Image from 'next/image';
import Link from 'next/link';

import NotFoundImage from '@/assets/images/404-NotFound.png';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Image
          src={NotFoundImage}
          alt="Not Found"
          className="h-full w-full md:h-96 md:w-96 lg:w-full xl:h-full xl:w-full"
        />
        <p className="text-lg text-gray-700">Oops! The page you are looking for does not exist.</p>
        <p className="text-lg text-gray-700">
          Credits :
          <a href="https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/ResponseCode/404%20NotFound.png">
            SAWARATSUKI
          </a>
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
