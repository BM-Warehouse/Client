'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi';

import Container from '@/components/parts/ContainerWarehouse/warehouse-container';
import ModalAddStockProduct from '@/components/parts/ModalAddStockProduct';
import ModalMoveStockProduct from '@/components/parts/ModalMoveStockProduct';
import Pagination from '@/components/parts/Pagination';
import { getWarehouseDetails } from '@/fetching/warehouse';
import useWarehouseStore from '@/store/warehouseStore';

const WarehouseDetailPage = () => {
  const params = useParams();
  const { warehouseData, getWarehouseData } = useWarehouseStore();
  const { warehouseId } = params;
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPage: 1 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [isMoveStockModalOpen, setIsMoveStockModalOpen] = useState(false);

  const handleOpenAddStockModal = (product) => {
    setSelectedProduct(product);
    setIsAddStockModalOpen(true);
  };

  const handleCloseAddStockModal = () => {
    setIsAddStockModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenMoveStockModal = (product) => {
    setSelectedProduct(product);
    setIsMoveStockModalOpen(true);
  };

  const handleCloseMoveStockModal = () => {
    setIsMoveStockModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProductFromWarehouse = () => {
    toast.success('Product Deleted Successfully!');
  };

  const fetchWarehouseDetails = async (id, page) => {
    setLoading(true);
    try {
      const { warehouseDetails, pagination } = await getWarehouseDetails(id, page);
      console.log(pagination, '<<<<<<<');
      setWarehouse(warehouseDetails);
      setPagination(pagination);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (warehouseId) {
      fetchWarehouseDetails(warehouseId, pagination.currentPage);
      getWarehouseData();
    }
  }, [warehouseId, pagination.currentPage, getWarehouseData]);

  // const handleDeleteProduct = async (productId) => {
  //   try {
  //     await deleteProductWarehouse(warehouseId, productId);
  //     setWarehouse((prev) => ({
  //       ...prev,
  //       products: prev.products.filter((product) => product.productId !== productId)
  //     }));
  //     toast.success('Deleted Successfully');
  //   } catch (error) {
  //     toast.error('Failed to delete product');
  //   }
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!warehouse) return <p>No warehouse details found.</p>;

  return (
    <div>
      <Container>
        <h1 className="mb-10 text-center text-2xl">{warehouse.name}</h1>
        <div className="overflow-x-auto">
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
              {warehouse.products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <div className="flex gap-4">
                      <button
                        className="bg-tertiary hover:bg-secondary px-4 py-2 text-white rounded-lg"
                        onClick={handleOpenAddStockModal}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <HiOutlineTrash />
                          Edit Stock
                        </span>
                      </button>
                      <button
                        className="bg-tertiary hover:bg-secondary px-4 py-2 text-white rounded-lg"
                        onClick={handleOpenMoveStockModal}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <HiOutlineTrash />
                          Move Product
                        </span>
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                        onClick={handleDeleteProductFromWarehouse}
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

      {isAddStockModalOpen && (
        <ModalAddStockProduct
          product={selectedProduct}
          onClose={handleCloseAddStockModal}
          warehouseData={warehouseData}
        />
      )}

      {isMoveStockModalOpen && (
        <ModalMoveStockProduct
          product={selectedProduct}
          onClose={handleCloseMoveStockModal}
          warehouseData={warehouseData}
        />
      )}
      <Pagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onClick={(page) => setPagination((prev) => ({ ...prev, currentPage: page }))}
      />
    </div>
  );
};

export default WarehouseDetailPage;
