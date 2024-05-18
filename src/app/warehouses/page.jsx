'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import DeleteWarehouseForm from '@/components/forms/deleteWarehouseForm';
import EditWarehouseForm from '@/components/forms/editWarehouseForm';
import Modal from '@/components/modals/modal';
import useModalStore from '@/hooks/useModalStore';
import useWarehouseStore from '@/store/warehouseStore';

const WarehousesPage = () => {
  const { warehouseData, getWarehouseData } = useWarehouseStore((state) => ({
    warehouseData: state.warehouseData,
    getWarehouseData: state.getWarehouseData
  }));

  useEffect(() => {
    getWarehouseData();
  }, [getWarehouseData]);

  const { isOpen, title, body, openModal, closeModal } = useModalStore();

  const handleOpenModal = (action, warehouseName, warehouseId) => {
    let modalTitle;
    let modalBody;
    let buttonLabel;

    switch (action) {
      case 'edit':
        modalTitle = `Edit ${warehouseName}`;
        modalBody = (
          <div>
            <EditWarehouseForm />
          </div>
        );

        openModal(modalTitle, modalBody, buttonLabel);
        break;
      // case 'move':
      //   modalTitle = `Move Stock from ${warehouseName}`;
      //   modalBody = (
      //     <div>
      //       <h2>Move Stock</h2>
      //       {/* Include your move stock form here */}
      //     </div>
      //   );

      // openModal(modalTitle, modalBody, buttonLabel);
      // break;
      case 'delete':
        modalTitle = `Delete ${warehouseName}`;
        modalBody = (
          <div>
            <h2>Are you sure you want to delete {warehouseName}?</h2>
            <h1>
              This will delete <strong>All products in the warehouse too</strong>{' '}
            </h1>
            <DeleteWarehouseForm id={warehouseId} />
          </div>
        );

        openModal(modalTitle, modalBody);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1 className="mb-10 text-center text-2xl">Warehouses</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Warehouse Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouseData.map((warehouse) => (
              <tr key={warehouse.id}>
                <th>{warehouse.id}</th>
                <td>
                  <Link href={`/warehouses/${warehouse.id}`} className="cursor-pointer">
                    {warehouse.name}
                  </Link>
                </td>
                <td>{warehouse.city}</td>
                <td>{warehouse.address}</td>
                <td>
                  <button
                    className="bg-tertiary hover:bg-secondary px-4 py-2 text-white"
                    onClick={() => handleOpenModal('edit', warehouse.name)}
                  >
                    Edit
                  </button>
                  {/* <button
                    className="ml-2 bg-secondary px-4 py-2 text-white"
                    onClick={() => handleOpenModal('move', warehouse.name)}
                  >
                    Move
                  </button> */}
                  <button
                    className="ml-2 bg-tertiary hover:bg-secondary px-4 py-2 text-white"
                    onClick={() => handleOpenModal('delete', warehouse.name, warehouse.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && <Modal title={title} body={body} closeModal={closeModal} />}
    </div>
  );
};

export default WarehousesPage;
