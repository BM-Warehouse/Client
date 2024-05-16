'use client';
import React, { useEffect, useState, createContext, useContext } from 'react';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';

import ContainerOrderDetail from '@/components/parts/ContainerDetailOrder';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { sendOrder } from '@/fetching/orders';
import { useRouter } from 'next/navigation';
import { getDetailOrder } from '@/fetching/orders';

const DetailOrder = ({ id }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const router = useRouter()
  const { selectedWarehouses } = useContext(DetailOrderContex);

  function handleSend() {
    console.log(selectedWarehouses);
    // const warehouseSelections = Object.entries(selectedWarehouses).map(([key, val]) => ({
    //   productId: +key,
    //   warehouseId: +val
    // }));
    // sendOrder(id, warehouseSelections)
    //   .then((res) => {
    //     console.log(res)
    //     router.push("/orders");
    //   }).catch((e) => {
    //     console.log(e);
    //   })
  }

  useEffect(() => {
    getDetailOrder(id)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch detail order');
        }
        return res.json();
      })
      .then((detailOrderData) => {
        setData(detailOrderData.data.productCheckout);
        setStatus(detailOrderData.data.status)
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [id]);

  useEffect(() => {
    console.log("status---", status);
    console.log("disabled---", status === 'SENT');
  }, [status])

  if (isLoading) return(
  <div className="flex justify-center items-center h-screen">
    <span className="loading loading-bars loading-lg text-tertiary"> </span>;
  </div>)
  if (!data) return <p className="ml-36">No Detail Order</p>;

  return (
    <main className="product-page bg-bgg relative h-screen font-poppins">
      <Navbar />
      <Sidebar />
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Order Detail</h1>
      </div>
      <div className="container-btn-products mt-20 flex flex-col-reverse items-center justify-between px-5 md:ml-20 md:flex-row">
        <div className="btn-add-product">
          <button
            className={`mt-5 min-w-28 rounded-md  px-3 py-2 text-primary  md:mt-0 ${status === 'SENT' ? 'bg-grey' : 'hover:bg-secondary bg-tertiary'}`}
            onClick={handleSend}
            disabled={status === 'SENT'}
          >
            <span className="flex items-center justify-center">
              <TbTruckDelivery className="mr-1" />
              {(status === 'SENT' ? "Sent" : "Send")}
            </span>
          </button>
        </div>
        <div className="search-filter flex items-center justify-center">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          {/* <div className="btn-filter ml-5 cursor-pointer rounded-lg p-1  hover:bg-secondary">
                    <IoFilterSharp className="text-3xl text-secondary hover:text-white " />
                  </div> */}
        </div>
      </div>

      <ContainerOrderDetail checkoutId={id} data={data} />

      <div className="container-pagination flex items-center justify-center pb-10 ">
        <div className="button-pagination">
          <MdKeyboardArrowLeft className="text-2xl" />
        </div>
        <div className="join">
          <button className="btn join-item">1</button>
          <button className="btn join-item btn-active">2</button>
          <button className="btn join-item">3</button>
          <button className="btn join-item">4</button>
        </div>
        <div className="button-pagination">
          <MdKeyboardArrowRight className="text-2xl" />
        </div>
      </div>
    </main>
  );
};

export default DetailOrder;
