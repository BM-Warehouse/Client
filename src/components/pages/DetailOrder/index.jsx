'use client';

import React, { useEffect, useState, useContext } from 'react';

import { useRouter } from 'next/navigation';
import { TbTruckDelivery } from 'react-icons/tb';
import { IoMdAdd } from "react-icons/io";

import ContainerOrderDetail from '@/components/parts/ContainerDetailOrder';
import Navbar from '@/components/parts/Navbar';
import Pagination from '@/components/parts/Pagination';
import Sidebar from '@/components/parts/Sidebar';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { sendOrder, getDetailOrder } from '@/fetching/orders';
import ModalAddProduct from '@/components/parts/ModalAddProduct';
import { getAllProducts } from '@/fetching/product';

const DetailOrder = ({ id }) => {
  const {data, setData} = useContext(DetailOrderContex);
  const [pagination, setPagination] = useState({
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  });
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const router = useRouter();
  const { selectedWarehouses, setCurrentCheckoutId, currentCheckoutId } = useContext(DetailOrderContex);
  const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);
  const [productList, setProductList] = useState(null);

  function handleSend() {
    const warehouseSelections = Object.entries(selectedWarehouses).map(([key, val]) => ({
      productId: +key,
      warehouseId: +val
    }));
    // console.log(warehouseSelections);
    sendOrder(id, warehouseSelections)
      .then((res) => {
        console.log(res);
        router.push('/orders');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const closeProductSelectionDialog = () => {
    setIsProductSelectOpen(false);
  }
  
  const openProductSelectionDialog = () => {
    getAllProducts().then((res) => {
      // console.log(">>", res);
      setProductList(res);
      setIsProductSelectOpen(true);
    })
  }

  // useEffect(() => {
  //   console.log(">>>>", selectedWarehouses);
  // }, [selectedWarehouses]);

  // useEffect(() => {
  //   console.log(">>>>", currentCheckoutId);
  // }, [currentCheckoutId]);

  useEffect(() => {
    setCurrentCheckoutId(id);
    getDetailOrder(id)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch detail order');
        }
        return res.json();
      })
      .then((detailOrderData) => {
        setData(detailOrderData.data.checkout.productCheckout);
        setStatus(detailOrderData.data.checkout.status);
        setPagination(detailOrderData.data.pagination);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [id]);

  // useEffect(() => {
  //   console.log('pagination---', pagination);
  // }, [pagination]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-bars loading-lg text-tertiary"> </span>;
      </div>
    );
  if (!data) return <p className="ml-36">No Detail Order</p>;

  const onPaginationClick = (setPage) => {
    console.log(setPage);
    getDetailOrder(id, setPage)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch detail order');
        }
        return res.json();
      })
      .then((detailOrderData) => {
        setData(detailOrderData.data.checkout.productCheckout);
        setStatus(detailOrderData.data.checkout.status);
        setPagination(detailOrderData.data.pagination);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <main className="product-page bg-bgg relative h-screen font-poppins">
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Order Detail</h1>
      </div>
      <div className="container-btn-products mt-20 flex items-center justify-between gap-3 px-5 md:ml-20 md:flex-row">
        <button
          className={`mt-5 min-w-28 rounded-md  px-3 py-2 text-primary  md:mt-0 ${status === 'SENT' ? 'bg-grey' : 'bg-tertiary hover:bg-secondary'
            }`}
          onClick={handleSend}
          disabled={status === 'SENT'}
        >
          <span className="flex items-center justify-center">
            <TbTruckDelivery className="mr-1" />
            {status === 'SENT' ? 'Sent' : 'Send'}
          </span>
        </button>
        {status === 'PACKING' && <button
          className={`mt-5 min-w-28 rounded-md  px-3 py-2 text-primary  md:mt-0 bg-tertiary hover:bg-secondary`}
          onClick={openProductSelectionDialog}
        >
          <span className="flex items-center justify-center">
            <IoMdAdd className="mr-1" />
            Add Product
          </span>
        </button>}
        
        <div className='flex-grow'> </div>
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
      <ModalAddProduct onClose={closeProductSelectionDialog} show={isProductSelectOpen} products={productList}/>
      <Pagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onClick={onPaginationClick}
      />
    </main>
  );
};

export default DetailOrder;
