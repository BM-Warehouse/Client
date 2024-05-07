/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import SusuBayik from '@/assets/images/susu-bayik.png';

function CardProduct() {
  return (
    <div className="w-30 card mb-10 cursor-pointer bg-base-100 shadow-xl hover:drop-shadow-2xl xl:w-60">
      <figure>
        <Image src={SusuBayik} alt="Shoes" />
      </figure>
      <div className="card-body gap-0 px-6 py-2">
        <h2 className="card-title text-sm md:text-base">Susu Enfagrow</h2>
        <p className="m-0 text-xs md:text-sm">Rp. 1.000.000</p>
        <div className="card-actions mt-2 justify-center">
          <div className="badge badge-outline text-[0.6rem] md:text-[0.7rem]">Kesehatan</div>
          <div className="badge badge-outline text-[0.6rem] md:text-[0.7rem]">Minuman</div>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
