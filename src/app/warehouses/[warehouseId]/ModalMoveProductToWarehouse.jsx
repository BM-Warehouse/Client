import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ButtonPrimary } from '@/components/parts/Button';
import { Input, Modal, Select } from '@/components/parts/Modal';
import { moveProductWarehouse } from '@/fetching/product';
import { getAllWarehouses } from '@/fetching/warehouse';
import useWarehouseStore from '@/store/warehouseStore';

const modalId = 'modal-move-product-to-warehouse';

const closeModalMoveProductToWarehouse = () => {
  document.getElementById(modalId).close();
};

const openModalMoveProductToWarehouse = () => {
  document.getElementById(modalId).showModal();
};

const ModalMoveProductToWarehouse = ({ warehouseId, productId }) => {
  const { getWarehouseDetails } = useWarehouseStore();
  const [warehouses, setWarehouses] = useState([]);
  useEffect(() => {
    getAllWarehouses(1, 9999)
      .then((r) => {
        setWarehouses(r.warehouses);
      })
      .catch((_e) => {
        toast.error('Fail to get products data');
      });
  }, [productId, warehouseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const destinationWarehouse = form.get('destinationWarehouse');
    const quantity = form.get('quantity');

    moveProductWarehouse(productId, warehouseId, destinationWarehouse, quantity)
      .then(() => {
        toast.success('The Product has been succesfully moved');
        getWarehouseDetails(warehouseId);
        closeModalMoveProductToWarehouse();
      })
      .catch((e) => {
        throw e;
      });
  };

  return (
    <Modal
      className="max-w-md"
      id={modalId}
      onSubmit={handleSubmit}
      title="Add Product To Warehouse"
    >
      <Select label="Destination Warehouse" name="destinationWarehouse">
        {warehouses.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </Select>
      <Input type="number" label="quantity" defaultValue={0} name="quantity" />

      <div className="flex items-center w-full justify-center">
        <ButtonPrimary type="submit" className="mr-5" icon="move">
          Move
        </ButtonPrimary>
        <ButtonPrimary
          type="button"
          className="ml-5"
          icon="cancel"
          onClick={closeModalMoveProductToWarehouse}
        >
          Cancel
        </ButtonPrimary>
      </div>
    </Modal>
  );
};

export {
  ModalMoveProductToWarehouse,
  closeModalMoveProductToWarehouse,
  openModalMoveProductToWarehouse
};
