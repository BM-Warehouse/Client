import Image from 'next/image';

import KategoriSusu from '@/assets/images/kategori-susu.jpg';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

function DetailCategory() {
  return (
    <section className="datail-category-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="detail-category-page-content flex w-full flex-col items-center px-2 py-10 text-tertiary md:px-10">
        <div className="detail-category-container mt-20 flex flex-col px-0 md:flex-row md:px-8 xl:px-24">
          <figure className="max-h-[30rem] w-full max-w-[30rem] p-2 md:w-2/4">
            <Image src={KategoriSusu} alt="Susu Bayi" />
          </figure>
          <div className="detail-body w-full px-6 pt-4 md:ml-10 md:w-2/4 md:px-0">
            <div className="title-category">
              <h5 className="mb-3 text-3xl font-bold">Susu Formula</h5>
            </div>
            <div className="description">
              <p className="text-sm leading-6">
                Susu formula adalah susu yang diformulasikan khusus untuk bayi sebagai pengganti
                atau pelengkap ASI, mengandung nutrisi penting untuk mendukung pertumbuhan dan
                perkembangan bayi yang optimal.
              </p>
            </div>
            <div className="btn-edit mt-5">
              <button className="w-full bg-tertiary px-8 py-4 font-bold text-white hover:bg-secondary">
                EDIT CATEGORY
              </button>
            </div>
            <div className="btn-delete mt-5">
              <button className="w-full bg-slate-500 px-8 py-4 font-bold text-white hover:bg-red-500">
                REMOVE CATEGORY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailCategory;
