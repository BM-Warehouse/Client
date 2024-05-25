'use client';

import React, { useEffect, useState, useContext } from 'react';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';

import { ButtonPrimary } from '@/components/parts/Button';
import ContainerOrderDetail from '@/components/parts/ContainerDetailOrder';
import Loading from '@/components/parts/Loading';
import OrderSteps from '@/components/parts/OrderSteps';
import Pagination from '@/components/parts/Pagination';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { sendOrder, getDetailOrder, confirmPayment } from '@/fetching/orders';
import { getAllProducts } from '@/fetching/product';
import formatRupiah from '@/lib/formatRupiah';

import ModalAddProduct from './ModalAddProduct';
import ModalDeleteVerification from './ModalDeleteVerification';
import ModalEditQuantity from './ModalEditQuantity';

const DetailOrder = ({ id }) => {
  const { data, setData, status, setStatus, totalPrice, setTotalPrice, pagination, setPagination } =
    useContext(DetailOrderContex);

  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { selectedWarehouses, setCurrentCheckoutId, setPage, setProductList } =
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
        toast.error('Something Wrong!');
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
        setTotalPrice(detailOrderData.data.checkout.totalPrice);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [id, setCurrentCheckoutId, setData, setPagination, setTotalPrice, setStatus]);

  // useEffect(() => {
  //   console.log('delete---', isModalDeleteVerificationOpen, selectedProductId);
  // }, [isModalDeleteVerificationOpen]);

  // useEffect(() => {
  //   console.log('edit---', isModalEditQuantityOpen, selectedProductId);
  // }, [isModalEditQuantityOpen]);

  if (isLoading) return <Loading />;
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

  const handleConfirm = () => {
    confirmPayment(id).then(() => {
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
      toast.success('Payment Confirmed');
    });
  };

  return (
    <main className="product-page bg-bgColor relative h-screen font-poppins">
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Order Detail</h1>
      </div>
      <div className="container-btn-products mt-20 flex items-center justify-between gap-1 px-5 md:ml-20 md:flex-row">
        <ButtonPrimary
          icon="truck"
          disable={status === 'SENT'}
          onClick={handleSend}
          className="px-6"
        >
          Send
        </ButtonPrimary>
        <ButtonPrimary
          icon="money"
          title="Confirm Payment"
          disable={status !== 'WAIT FOR PAYMENT'}
          onClick={handleConfirm}
        >
          Confirm
        </ButtonPrimary>
        <ButtonPrimary
          icon="add"
          onClick={openProductSelectionDialog}
          disable={status !== 'WAIT FOR PAYMENT'}
        >
          Add Product
        </ButtonPrimary>

        <div className="grow"> </div>
        <div className="search-filter flex items-center justify-center">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <FaSearch />
          </label>
        </div>
      </div>
      <OrderSteps status={status} />
      <p className="text-black ml-28 mt-10 text-lg font-bold">{`Total Price: ${formatRupiah(
        totalPrice
      )}`}</p>
      <ContainerOrderDetail checkoutId={id} data={data} />
      <ModalAddProduct onClose={closeProductSelectionDialog} show={isProductSelectOpen} />
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
