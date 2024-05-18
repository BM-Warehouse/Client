import React, { useEffect, useState } from 'react';

import ModalAddStockProduct from '@/components/parts/ModalAddStockProduct';
import RowProduct from '@/components/parts/RowProduct';
import useWarehouseStore from '@/store/warehouseStore';

function ContainerProductsAdmin({ productsData }) {
  const { warehouseData, getWarehouseData } = useWarehouseStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    getWarehouseData();
  }, [getWarehouseData]);

  console.log(warehouseData);

  if (!productsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-products mt-4 p-4 md:ml-20">
      <div className="overflow-x-auto rounded-xl border border-secondary px-7 py-5">
        <table className="table table-zebra">
          <thead className="text-tertiary">
            <tr className="text-base">
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Total Stock</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="text-tertiary">
            {productsData.map((product) => (
              <RowProduct key={product.id} product={product} onOpenModal={handleOpenModal} />
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ModalAddStockProduct
          product={selectedProduct}
          onClose={handleCloseModal}
          warehouseData={warehouseData}
        />
      )}
    </div>
  );
}

export default ContainerProductsAdmin;
