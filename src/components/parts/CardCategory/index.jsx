import Image from 'next/image';

import KategoriSusu from '@/assets/images/kategori-susu.jpg';

function CardCategory() {
  return (
    <div className="w-30 card mb-10 cursor-pointer bg-base-100 shadow-xl hover:drop-shadow-2xl xl:w-60">
      <figure>
        <Image src={KategoriSusu} alt="Shoes" />
      </figure>
      <div className="card-body gap-0 px-6 py-2">
        <h2 className="card-title text-sm md:text-base">Susu</h2>
        <p className='"m-0 text-xs md:text-sm'>Susu formula pilihan terbaik para bunda</p>
      </div>
    </div>
  );
}

export default CardCategory;
