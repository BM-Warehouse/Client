/* eslint-disable @next/next/no-img-element */

'use client';

import { useEffect, useState } from 'react';

// import Image from 'next/image';
import { BiPlus, BiMinus } from 'react-icons/bi';

// import SusuBayik from '@/assets/images/susu-bayik.png';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import formatRupiah from '@/lib/formatRupiah';
import useProductStore from '@/store/productStore';

function DetailProduct({ params }) {
  const { detailProduct, asyncGetDetail } = useProductStore();
  const [quantity, setQuantity] = useState(1);

  const id = +params.productId;

  useEffect(() => {
    asyncGetDetail(id);
  }, [asyncGetDetail, id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity <= +detailProduct.totalStock) {
      setQuantity(quantity + 1);
    }
  };

  if (!detailProduct) {
    return <div>Loading...</div>;
  }

  return (
    <section className="datail-product-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="detail-product-page-content flex w-full flex-col items-center px-2 py-10 text-tertiary md:px-10">
        <div className="detail-product-container mt-20 flex flex-col px-0 md:flex-row md:px-8 xl:px-24">
          <figure className="max-h-[30rem] w-full max-w-[30rem] p-2 md:w-2/4">
            <img src={detailProduct.imageUrl} alt={detailProduct.name} />
          </figure>
          <div className="detail-body w-full px-6 pt-4 md:ml-10 md:w-2/4 md:px-0">
            <div className="title-product">
              <p className="mb-3 flex gap-2 text-base">
                {detailProduct.productCategories.map((ctg) => (
                  <span
                    key={ctg.category.id}
                    className="badge badge-outline text-[0.7rem] md:text-[0.8rem]"
                  >
                    {ctg.category.name}
                  </span>
                ))}
              </p>
              <h5 className="mb-3 text-3xl font-bold">{detailProduct.name}</h5>
              <p className="price mb-3 text-2xl">{formatRupiah(detailProduct.price)}</p>
              <p className="price mb-6 text-base">
                Tersisa <span>{detailProduct.totalStock}</span> buah
              </p>
            </div>
            <div className="quantity">
              <p className="mb-4">Quantity</p>
              <div className="container-quantity mb-6 flex items-center gap-2 ">
                <button
                  onClick={decreaseQuantity}
                  className="btn-size rounded-sm bg-tertiary text-3xl text-bgColor hover:bg-secondary "
                >
                  <BiMinus />
                </button>
                <label className="btn-size border-1 border-solid border-tertiary bg-bgColor px-5 py-2 hover:border-secondary xl:px-8">
                  {quantity}
                </label>
                <button
                  onClick={increaseQuantity}
                  className="btn-size rounded-sm bg-tertiary text-3xl text-bgColor  hover:bg-secondary "
                >
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
              <p className="text-sm leading-6">{detailProduct.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailProduct;
