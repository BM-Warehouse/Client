import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ButtonPrimary } from '@/components/parts/Button';
import { Input, Modal, Select } from '@/components/parts/Modal';
import { addProductToWarehouse, getAllProducts } from '@/fetching/product';
import useWarehouseStore from '@/store/warehouseStore';

const modalId = 'modal-add-product-to-warehouse';

const closeModalAddProductToWarehouse = () => {
  document.getElementById(modalId).close();
};

const openModalAddProductToWarehouse = () => {
  document.getElementById(modalId).showModal();
};

const ModalAddProductToWarehouse = ({ warehouseId }) => {
  const { getWarehouseDetails } = useWarehouseStore();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts(1, 9999)
      .then((r) => {
        setProducts(r.products);
      })
      .catch((e) => {
        console.log(e);
        toast.error('Fail to get products data');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const productId = form.get('product');
    const quantity = form.get('quantity');

    addProductToWarehouse(productId, warehouseId, quantity)
      .then(() => {
        toast.success('The Product has been succesfully added');
        getWarehouseDetails(warehouseId);
        closeModalAddProductToWarehouse();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Modal
      className="max-w-md"
      id={modalId}
      onSubmit={handleSubmit}
      title="Add Product To Warehouse"
    >
      <Select label="Product" name="product">
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </Select>
      <Input type="number" label="quantity" defaultValue={0} name="quantity" />

      <div className="flex items-center w-full justify-center">
        <ButtonPrimary type="submit" className="mr-5" icon="add">
          Add
        </ButtonPrimary>
        <ButtonPrimary
          type="button"
          className="ml-5"
          icon="cancel"
          onClick={closeModalAddProductToWarehouse}
        >
          Cancel
        </ButtonPrimary>
      </div>
    </Modal>
  );
};

export {
  ModalAddProductToWarehouse,
  closeModalAddProductToWarehouse,
  openModalAddProductToWarehouse
};
