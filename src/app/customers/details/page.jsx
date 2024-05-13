import Image from 'next/image';

import ProfilePhoto from '@/assets/images/profile-photo.jpg';

const CustomerDetailsPage = () => (
  <div className="flex justify-center ">
    <div className="flex w-full flex-col items-center text-center  font-bold text-tertiary">
      <h1 className="mb-5 text-2xl">{`Customer 1's Profile`}</h1>
      <div className="w-48">
        <Image
          alt="Tailwind CSS Navbar component"
          src={ProfilePhoto}
          className="mb-10 rounded-full
        "
        />
      </div>
      <div className="flex w-full flex-col gap-10 rounded-xl bg-secondary px-6 py-10 text-left text-white md:px-20">
        <p className="text-md border-b pb-2 font-normal md:text-lg">Name : Customer 1</p>
        <p className="text-md border-b pb-2 font-normal md:text-lg">Username: customer_1</p>
        <p className="text-md border-b pb-2 font-normal md:text-lg">Email : customer1@mail.com</p>
        <p className="text-md border-b pb-2 font-normal md:text-lg">Phone: +62871828283</p>
      </div>
    </div>
  </div>
);

export default CustomerDetailsPage;
