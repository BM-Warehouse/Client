import React from 'react';

import Image from 'next/image';

const page = () => (
  <div>
    <Image
      src="https://res.cloudinary.com/denyah3ls/image/upload/v1716386344/mifwrz1trf113jk6v1ij.jpg"
      width={500}
      height={50}
      className="w-96 h-full"
      alt="test"
    />
  </div>
);

export default page;
