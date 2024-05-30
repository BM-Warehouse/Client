import React, { useEffect, useState } from 'react';

import ModalAddStockProduct from '@/components/parts/ModalAddStockProduct';
import ModalMoveStockProduct from '@/components/parts/ModalMoveStockProduct';
import RowProduct from '@/components/parts/RowProduct';
import useSidebarStore from '@/store/sidebarStore';
import useWarehouseStore from '@/store/warehouseStore';

function ContainerProductsAdmin({ productsData }) {
  const { warehouseData, getWarehouseData } = useWarehouseStore();
  const { expanded } = useSidebarStore();
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

  useEffect(() => {
    getWarehouseData(1, 20);
  }, [getWarehouseData]);

  if (!productsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`container-products mt-4 p-4 ${expanded ? 'md:ml-72' : 'md:ml-20'} `}>
      <div className="overflow-x-auto rounded-xl border border-secondary px-7 py-5">
        <table className="table table-zebra">
          <thead className="text-tertiary">
            <tr className="text-base">
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Total Stock</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody className="text-tertiary">
            {productsData.map((product) => (
              <RowProduct
                key={product.id}
                product={product}
                onOpenModal={handleOpenAddStockModal}
                onOpenMoveModal={handleOpenMoveStockModal}
              />
            ))}
          </tbody>
        </table>
      </div>
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
    </div>
  );
}

export default ContainerProductsAdmin;
