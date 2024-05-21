'use client';

import React, { useEffect, useState, useContext } from 'react';

import { useRouter } from 'next/navigation';

import { ButtonPrimary } from '@/components/parts/Button';
import ContainerOrderDetail from '@/components/parts/ContainerDetailOrder';
import Pagination from '@/components/parts/Pagination';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { sendOrder, getDetailOrder } from '@/fetching/orders';
import { getAllProducts } from '@/fetching/product';

import ModalAddProduct from './ModalAddProduct';
import ModalDeleteVerification from './ModalDeleteVerification';
import ModalEditQuantity from './ModalEditQuantity';


const DetailOrder = ({ id }) => {
  const { data, setData } = useContext(DetailOrderContex);
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
  const { selectedWarehouses, setCurrentCheckoutId, setPage, productList, setProductList } =
    useContext(DetailOrderContex);
  const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);
  // const [productList, setProductList] = useState([]);

  const handleSend = () => {
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
  };

  const closeProductSelectionDialog = () => {
    setIsProductSelectOpen(false);
  };

  const openProductSelectionDialog = () => {
    getAllProducts().then((res) => {
      // console.log(">>", res);
      setProductList(res.products);
      setIsProductSelectOpen(true);
    });
  };

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
  }, [id, setCurrentCheckoutId, setData]);

  // useEffect(() => {
  //   console.log('delete---', isModalDeleteVerificationOpen, selectedProductId);
  // }, [isModalDeleteVerificationOpen]);

  // useEffect(() => {
  //   console.log('edit---', isModalEditQuantityOpen, selectedProductId);
  // }, [isModalEditQuantityOpen]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-bars loading-lg text-tertiary"> </span>;
      </div>
    );
  if (!data) return <p className="ml-36">No Detail Order</p>;

  const onPaginationClick = (page) => {
    // console.log(page);
    setPage(page);
    getDetailOrder(id, page)
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
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Order Detail</h1>
      </div>
      <div className="container-btn-products mt-20 flex items-center justify-between gap-3 px-5 md:ml-20 md:flex-row">
        <ButtonPrimary
          icon="truck"
          disable={status === 'SENT'}
          onClick={handleSend}
          className='px-6'
          >
          Send
        </ButtonPrimary>


        {status === 'PACKING' && (
          <ButtonPrimary
            icon="add"
            onClick={openProductSelectionDialog}>
            Add Product
          </ButtonPrimary>
        )}

        <div className="grow"> </div>
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
      <ModalAddProduct
        onClose={closeProductSelectionDialog}
        show={isProductSelectOpen}
        products={productList}
      />
      <ModalDeleteVerification checkoutId={id} />
      <ModalEditQuantity checkoutId={id} />
      <Pagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onClick={onPaginationClick}
      />
    </main>
  );
};

export default DetailOrder;
