import toast from 'react-hot-toast';

import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { Input, Modal } from '@/components/parts/Modal';
import { addDamageProduct } from '@/fetching/product';
import useWarehouseStore from '@/store/warehouseStore';

const modalId = 'modal-delete-product-warehouse';

const closeModalDeleteProductWarehouse = () => {
  document.getElementById(modalId).close();
};

const openModalDeleteProductWarehouse = () => {
  document.getElementById(modalId).showModal();
};

const ModalDeleteProductWarehouse = ({ warehouseId, productId }) => {
  const { getWarehouseDetails } = useWarehouseStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const quantity = form.get('quantity');

    addDamageProduct(productId, warehouseId, quantity)
      .then(() => {
        toast.success('The Damage Product has been succesfully removed');
        getWarehouseDetails(warehouseId);
        closeModalDeleteProductWarehouse();
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
      title="Delete"
      description="Delete the damage product from the Warehouse"
    >
      <Input type="number" label="quantity" defaultValue={0} name="quantity" />

      <div className="flex items-center w-full justify-center">
        <ButtonStrong type="submit" className="mr-5" icon="delete">
          Delete
        </ButtonStrong>
        <ButtonPrimary
          type="button"
          className="ml-5"
          icon="cancel"
          onClick={closeModalDeleteProductWarehouse}
        >
          Cancel
        </ButtonPrimary>
      </div>
    </Modal>
  );
};

export {
  ModalDeleteProductWarehouse,
  closeModalDeleteProductWarehouse,
  openModalDeleteProductWarehouse
};
