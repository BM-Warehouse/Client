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
import { getAllCouriers } from '@/fetching/courier';
import { sendOrder, getDetailOrder, confirmPayment } from '@/fetching/orders';
import { getAllProducts } from '@/fetching/product';
import { getAllUsers } from '@/fetching/user';
import formatRupiah from '@/lib/formatRupiah';

import ModalAddProduct from './ModalAddProduct';
import ModalDeleteVerification from './ModalDeleteVerification';
import ModalEditOrder, { openModalEditOrder } from './ModalEditOrder';
import ModalEditQuantity from './ModalEditQuantity';

const DetailOrder = ({ id }) => {
  const {
    data, // contain productCheckout Data
    allData, // contain all detailOrderr Data
    setAllData,
    setData,
    status,
    setStatus,
    totalPrice,
    setTotalPrice,
    pagination,
    setPagination,
    setTotalProductPrice,
    totalProductPrice,
    courierPrice,
    setCourierPrice,
    setCouriers,
    setUsers
  } = useContext(DetailOrderContex);

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
  //   console.log('>>>>', allData);
  // }, [allData]);

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
        setAllData(detailOrderData.data);
        setData(detailOrderData.data.checkout.productCheckout);
        setStatus(detailOrderData.data.checkout.status);
        setPagination(detailOrderData.data.pagination);
        setTotalPrice(detailOrderData.data.checkout.totalPrice);
        setTotalProductPrice(detailOrderData.data.checkout.totalProductPrice);
        setCourierPrice(detailOrderData.data.checkout.couriers.price);
        setLoading(false);

        Promise.all([getAllUsers('', 1, 9999), getAllCouriers(1, 9999)])
          .then((r) => {
            console.log(r);
            setUsers(r[0].users);
            setCouriers(r[1].data.couriers.couriers);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [
    id,
    setCurrentCheckoutId,
    setData,
    setPagination,
    setTotalPrice,
    setStatus,
    setTotalProductPrice,
    setCourierPrice,
    setAllData,
    setCouriers,
    setUsers
  ]);

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
          icon="edit"
          title="Confirm Payment"
          disable={status !== 'WAIT FOR PAYMENT'}
          onClick={() => {
            openModalEditOrder();
          }}
        >
          Edit
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
      <div className="flex justify-between items-end mr-8 ml-28">
        <div className="right-3 w-full">
          <p className="text-secondary text-md font-bold">
            {allData?.checkout?.user?.fullName} (@{allData.checkout?.user?.username})
          </p>
          <p className="text-secondary text-md">{allData.checkout.address}</p>
          <p className="text-secondary text-md">{allData.checkout.couriers.name}</p>
          <p className="text-secondary text-md">{allData.checkout.method}</p>
        </div>
        <div className="right-3 w-72">
          <div className="flex items-center justify-between">
            <span className="text-secondary text-md">Product Price:</span>
            <span className="text-secondary text-md">{formatRupiah(totalProductPrice)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-secondary text-md">Delivery:</span>
            <span className="text-secondary text-md">{formatRupiah(courierPrice)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-secondary text-md">Total Price:</span>
            <span className="text-secondary text-xl font-bold">{formatRupiah(totalPrice)}</span>
          </div>
        </div>
      </div>
      <ContainerOrderDetail checkoutId={id} data={data} />
      <ModalEditOrder checkoutId={id} />
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
