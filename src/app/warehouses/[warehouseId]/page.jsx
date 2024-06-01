// WarehouseDetailPage.jsx

'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { FiArrowDownRight } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';

import { ModalAddProductToWarehouse } from '@/app/warehouses/[warehouseId]/ModalAddProductToWarehouse';
import Container from '@/app/warehouses/[warehouseId]/warehouse-container';
import Pagination from '@/components/parts/Pagination';
import useWarehouseStore from '@/store/warehouseStore';

import {
  ModalMoveProductToWarehouse,
  openModalMoveProductToWarehouse
} from './ModalMoveProductToWarehouse';
import {
  ModalReduceProductWarehouse,
  openModalReduceProductWarehouse
} from './ModalReduceProductWarehouse';

const WarehouseDetailPage = ({ params }) => {
  const {
    getWarehouseDetails,
    warehouseDetails,
    pagination,
    productsWarehouses,
    deleteProductFromWarehouse
  } = useWarehouseStore();
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const id = +params.warehouseId;

  const handleOpenReduceStockModal = (productId) => {
    setSelectedProductId(productId);
    openModalReduceProductWarehouse();
  };

  const handleOpenMoveStockModal = (productId) => {
    setSelectedProductId(productId);
    openModalMoveProductToWarehouse();
  };

  const handleDeleteProductFromWarehouse = async (productId) => {
    try {
      await deleteProductFromWarehouse(id, productId);
      toast.success('Product Deleted Successfully!');
      getWarehouseDetails(id);
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    getWarehouseDetails(id).then(() => {
      setLoading(false);
    });
  }, [getWarehouseDetails, id]);

  const onPaginationClick = async (page) => {
    await getWarehouseDetails(id, page);
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-bars loading-lg text-tertiary"> </span>;
      </div>
    );

  if (!warehouseDetails || !productsWarehouses) {
    return null;
  }

  return (
    <main className="category-page bg-bgColor relative h-screen font-poppins">
      <div className="w-full">
        <Container>
          <h1 className="mb-10 text-center text-2xl">{warehouseDetails.name}</h1>
          <div className="flex justify-center">
            <table className="table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsWarehouses.map((product) => (
                  <tr key={product.product.id}>
                    <td>{product.product.id}</td>
                    <td>
                      <Link href={`/warehouses/${id}/warehouse-products/${product.product.id}`}>
                        {product.product.name}
                      </Link>
                    </td>
                    <td>{product.quantity}</td>
                    <td>
                      <div className="flex gap-4">
                        <button
                          className="bg-tertiary hover:bg-secondary px-4 py-2 text-white rounded-lg"
                          onClick={() => {
                            handleOpenReduceStockModal(product.product.id);
                          }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <FiArrowDownRight />
                            Reduce
                          </span>
                        </button>
                        <button
                          className="bg-tertiary hover:bg-secondary px-4 py-2 text-white rounded-lg"
                          onClick={() => {
                            handleOpenMoveStockModal(product.product.id);
                          }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <FaArrowRightArrowLeft />
                            Move Product
                          </span>
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                          onClick={() => handleDeleteProductFromWarehouse(product.product.id)}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <HiOutlineTrash />
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>

        <ModalAddProductToWarehouse warehouseId={id} />
        <ModalReduceProductWarehouse warehouseId={id} productId={selectedProductId} />
        <ModalMoveProductToWarehouse warehouseId={id} productId={selectedProductId} />

        <Pagination
          currentPage={pagination.currentPage}
          totalPage={pagination.totalPage}
          onClick={onPaginationClick}
        />
      </div>
    </main>
  );
};

export default WarehouseDetailPage;
