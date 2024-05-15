import Image from 'next/image';

import SusuBayik from '@/assets/images/susu-bayik.png';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

function DetailUser() {
  return (
    <section className="detail-user-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="detail-user-page-content flex w-full flex-col items-center px-56 py-10 text-primary md:px-10">
        <div className="detail-user-container mt-20 flex flex-col items-center px-0 md:px-8 xl:px-24">
          <figure className="max-h-[30rem] w-full max-w-[45rem] p-2 md:w-2/4">
            <Image src={SusuBayik} alt="Susu Bayi" />
          </figure>
          <div className="detail-body w-full px-6 pt-4 md:ml-10 md:w-4/5 md:px-0">
            <div className="title-user bg-tertiary rounded-lg shadow-lg">
              <p className="mb-3 text-base">Nama : </p>
              <p className="price mb-6 text-base">email:</p>
              <p className="mb-3 text-base">username : </p>
              <p className="price mb-3 text-base">password: </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailUser;
