'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
// import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi';

import { ModalAddProductToWarehouse } from '@/components/parts/ContainerWarehouse/ModalAddProductToWarehouse';
import Container from '@/components/parts/ContainerWarehouse/warehouse-container';
import ModalAddStockProduct from '@/components/parts/ModalAddStockProduct';
import ModalMoveStockProduct from '@/components/parts/ModalMoveStockProduct';
import Pagination from '@/components/parts/Pagination';
// import { getWarehouseDetails } from '@/fetching/warehouse';
import useWarehouseStore from '@/store/warehouseStore';

const WarehouseDetailPage = ({ params }) => {
  // const params = useParams();
  const { warehouseData, getWarehouseDetails, warehouseDetails, pagination, productsWarehouses } =
    useWarehouseStore();
  // const { warehouseId } = params;
  // const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [pagination, setPagination] = useState({ currentPage: 1, totalPage: 1 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);
  const [isMoveStockModalOpen, setIsMoveStockModalOpen] = useState(false);
  const id = +params.warehouseId;

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

  // const fetchWarehouseDetails = async (id, page) => {
  //   setLoading(true);
  //   try {
  //     const { warehouseDetails, pagination } = await getWarehouseDetails(id, page);
  //     console.log(pagination, '<<<<<<<');
  //     setWarehouse(warehouseDetails);
  //     setPagination(pagination);
  //   } catch (e) {
  //     setError(e.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    // if (id) {
    getWarehouseDetails(id).then(() => {
      setLoading(false);
    });
    // getWarehouseData();
    // }
  }, [getWarehouseDetails, id]);

  const onPaginationClick = async (page) => {
    await getWarehouseDetails(id, page);
  };

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

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-bars loading-lg text-tertiary"> </span>;
      </div>
    );
  // if (error) return <p>Error: {error}</p>;
  // if (!warehouse) return <p>No warehouse details found.</p>;
  if (!warehouseDetails || !productsWarehouses) {
    return null;
  }
  console.log(id);

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

        <ModalAddProductToWarehouse warehouseId={id} />

        <Pagination
          currentPage={pagination.currentPage}
          totalPage={pagination.totalPage}
          // onClick={(page) => setPagination((prev) => ({ ...prev, currentPage: page }))}
          onClick={onPaginationClick}
        />
      </div>
    </main>
  );
};

export default WarehouseDetailPage;
