'use client';

import Image from 'next/image';
import { BiPlus, BiMinus } from 'react-icons/bi';

import SusuBayik from '@/assets/images/susu-bayik.png';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import formatRupiah from '@/lib/formatRupiah';
import useProductStore from '@/store/productStore';

function DetailProduct() {
  const { detailProduct } = useProductStore();
  console.log(detailProduct);

  return (
    <section className="datail-product-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="detail-product-page-content flex w-full flex-col items-center px-2 py-10 text-tertiary md:px-10">
        <div className="detail-product-container mt-20 flex flex-col px-0 md:flex-row md:px-8 xl:px-24">
          <figure className="max-h-[30rem] w-full max-w-[30rem] p-2 md:w-2/4">
            <Image src={SusuBayik} alt="Susu Bayi" />
          </figure>
          <div className="detail-body w-full px-6 pt-4 md:ml-10 md:w-2/4 md:px-0">
            <div className="title-product">
              <p className="mb-3 text-base">Foods & Grocery</p>
              <h5 className="mb-3 text-3xl font-bold">PediaComplete Vanila</h5>
              <p className="price mb-3 text-2xl">{formatRupiah(500000)}</p>
              <p className="price mb-6 text-base">
                Tersisa <span>30</span> buah
              </p>
            </div>
            <div className="quantity">
              <p className="mb-4">Quantity</p>
              <div className="container-quantity mb-6 flex items-center gap-2 ">
                <button className="btn-size rounded-sm bg-tertiary text-3xl text-bgColor hover:bg-secondary ">
                  <BiMinus />
                </button>
                <label className="btn-size border-1 border-solid border-tertiary bg-bgColor px-5 py-2 hover:border-secondary xl:px-8">
                  50
                </label>
                <button className="btn-size rounded-sm bg-tertiary text-3xl text-bgColor  hover:bg-secondary ">
                  <BiPlus />
                </button>
              </div>
            </div>
            <div className="btn-add mb-10">
              <button className="w-full bg-tertiary px-8 py-4 font-bold text-white hover:bg-secondary">
                ADD TO CHART
              </button>
            </div>
            <div className="description">
              <p className="text-sm leading-6">
                PEDIASURE COMPLETE VANILLA merupakan nutrisi untuk mendukung pertumbuhan anak. Untuk
                anak usia 1-12 tahun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailProduct;
