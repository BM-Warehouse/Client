/* eslint-disable import/order */
/* eslint-disable no-alert */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useEffect, useState } from 'react';

// import Image from 'next/image';

// import SusuBayik from '@/assets/images/susu-bayik.png';
import { useRouter } from 'next/navigation';
import { BiPlus, BiMinus, BiEditAlt } from 'react-icons/bi';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { HiOutlineTrash, HiArrowsExpand } from 'react-icons/hi';
import { LuBoxes } from 'react-icons/lu';

import ModalAddStockProduct from '@/components/parts/ModalAddStockProduct';
import ModalMoveStockProduct from '@/components/parts/ModalMoveStockProduct';
import ModalReduceStockProduct from '@/components/parts/ModalReduceStockProduct';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import formatRupiah from '@/lib/formatRupiah';
import useAuthUserStore from '@/store/authUserStore';
import useCartStore from '@/store/cartStore';
import useProductStore from '@/store/productStore';
import useWarehouseStore from '@/store/warehouseStore';
import Link from 'next/link';
import ModalAddCategoryProduct from '@/components/parts/ModalAddCategoryProduct';
import useCategoryStore from '@/store/categoryStore';
import toast from 'react-hot-toast';
import ModalConfirmation from '@/components/parts/ModalConfirmation';
import ProductChart from '@/components/elements/ProductChart';
import Loading from '@/components/parts/Loading';

function DetailProduct({ params }) {
  const { detailProduct, asyncGetDetail, asyncDeleteProduct } = useProductStore();
  const { warehouseData, getWarehouseData } = useWarehouseStore();
  const { categoriesData, asyncGetAllWithoutPagination } = useCategoryStore();
  const { asyncAddProductToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [showMoveStockModal, setShowMoveStockModal] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showReduceStockModal, setShowReduceStockModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const { role } = useAuthUserStore();
  const router = useRouter();

  const id = +params.productId;

  useEffect(() => {
    asyncGetDetail(id);
  }, [asyncGetDetail, id]);

  useEffect(() => {
    getWarehouseData();
  }, [getWarehouseData]);

  useEffect(() => {
    asyncGetAllWithoutPagination();
  }, [asyncGetAllWithoutPagination]);

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

  const handleAddToCart = async () => {
    const payload = {
      product: {
        productId: detailProduct.id,
        quantity
      }
    };
    try {
      await asyncAddProductToCart(payload);
      toast.success('Product added to cart successfully!');
      setQuantity(1);
    } catch (error) {
      toast.error('Failed to add product to cart.');
      console.error('Error adding product to cart:', error.message);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await asyncDeleteProduct(detailProduct.id);
      toast.success('Product removed successfully!');
      router.push('/products');
    } catch (error) {
      toast.error('Failed to remove product.');
      console.error('Error deleting product:', error.message);
    }
  };

  if (!detailProduct) {
    return <Loading />;
  }

  if (!role) {
    return <Loading />;
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
                {detailProduct.productCategories &&
                  detailProduct.productCategories.map((ctg) => (
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
              {role === 'user' ? (
                <p className="price mb-6 text-base">
                  Tersisa <span>{detailProduct.totalStock}</span> buah
                </p>
              ) : (
                <p className="price mb-6 text-base">
                  Total Stock <span>{detailProduct.totalStock}</span> buah
                </p>
              )}
            </div>
            {role === 'user' && (
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
            )}
            {role === 'user' && (
              <div className="btn-add mb-10">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-tertiary px-8 py-4 font-bold text-white hover:bg-secondary"
                >
                  ADD TO CHART
                </button>
              </div>
            )}

            <div className="description">
              <p className="text-sm leading-6">{detailProduct.description}</p>
            </div>
            {role === 'admin' && (
              <div className="buttons-product-admin mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="btn-add mb-1">
                  <button
                    onClick={() => setShowAddStockModal(true)}
                    className="w-full bg-tertiary px-8 py-4 font-bold text-white hover:bg-secondary md:px-2 md:py-3"
                  >
                    <span className="flex items-center justify-center">
                      <FiArrowUpRight className="mr-1" />
                      Add Stock
                    </span>
                  </button>
                </div>
                <div className="btn-add mb-1">
                  <button
                    onClick={() => setShowMoveStockModal(true)}
                    className="w-full bg-tertiary px-8 py-4 font-bold text-white  hover:bg-secondary md:px-2 md:py-3"
                  >
                    <span className="flex items-center justify-center">
                      <HiArrowsExpand className="mr-1" />
                      Move Stock
                    </span>
                  </button>
                </div>
                <div className="btn-add mb-1">
                  <button
                    onClick={() => setShowAddCategoryModal(true)}
                    className="w-full bg-tertiary px-8 py-4 font-bold text-white  hover:bg-secondary md:px-2 md:py-3"
                  >
                    <span className="flex items-center justify-center">
                      <LuBoxes className="mr-1" />
                      Add Category
                    </span>
                  </button>
                </div>
                <div className="btn-add mb-1">
                  <button
                    onClick={() => setShowReduceStockModal(true)}
                    className="w-full bg-tertiary px-8 py-4 font-bold text-white  hover:bg-secondary md:px-2 md:py-3"
                  >
                    <span className="flex items-center justify-center">
                      <FiArrowDownLeft className="mr-1" />
                      Reduce Stock
                    </span>
                  </button>
                </div>
                <div className="btn-add mb-1">
                  <Link href={`/edit-product/${id}`}>
                    <button className="w-full bg-tertiary px-8 py-4 font-bold text-white  hover:bg-secondary md:px-2 md:py-3">
                      <span className="flex items-center justify-center">
                        <BiEditAlt className="mr-1" />
                        Edit Product
                      </span>
                    </button>
                  </Link>
                </div>
                <div className="btn-add mb-1">
                  <button
                    onClick={() => document.getElementById('modal-confirmation-delete').showModal()}
                    className="w-full bg-ligtDanger px-8 py-4 font-bold text-white hover:bg-danger md:px-2 md:py-3"
                  >
                    <span className="flex items-center justify-center">
                      <HiOutlineTrash className="mr-1" />
                      Delete
                    </span>
                  </button>
                  <ModalConfirmation
                    action={handleDeleteProduct}
                    message="Are you sure you want to delete this product?"
                    id="modal-confirmation-delete"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {role === 'admin' && <ProductChart detailProduct={detailProduct} />}
      </div>
      {showMoveStockModal && (
        <ModalMoveStockProduct
          product={detailProduct}
          onClose={() => setShowMoveStockModal(false)}
          warehouseData={warehouseData}
        />
      )}
      {showAddStockModal && (
        <ModalAddStockProduct
          product={detailProduct}
          onClose={() => setShowAddStockModal(false)}
          warehouseData={warehouseData}
        />
      )}
      {showReduceStockModal && (
        <ModalReduceStockProduct
          product={detailProduct}
          onClose={() => setShowReduceStockModal(false)}
          warehouseData={warehouseData}
        />
      )}
      {showAddCategoryModal && (
        <ModalAddCategoryProduct
          product={detailProduct}
          onClose={() => setShowAddCategoryModal(false)}
          categoriesData={categoriesData}
        />
      )}
    </section>
  );
}

export default DetailProduct;
