import toast from 'react-hot-toast';

import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { Input, Modal } from '@/components/parts/Modal';
import { addDamageProduct } from '@/fetching/product';
import useWarehouseStore from '@/store/warehouseStore';

const modalId = 'modal-reduce-product-warehouse';

const closeModalReduceProductWarehouse = () => {
  document.getElementById(modalId).close();
};

const openModalReduceProductWarehouse = () => {
  document.getElementById(modalId).showModal();
};

const ModalReduceProductWarehouse = ({ warehouseId, productId }) => {
  const { getWarehouseDetails } = useWarehouseStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const quantity = form.get('quantity');

    addDamageProduct(productId, warehouseId, quantity)
      .then(() => {
        toast.success('The Damage Product has been succesfully removed');
        getWarehouseDetails(warehouseId);
        closeModalReduceProductWarehouse();
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
      title="Reduce"
      description="Reduce the damage product from the Warehouse"
    >
      <Input type="number" label="quantity" defaultValue={0} name="quantity" />

      <div className="flex items-center w-full justify-center">
        <ButtonStrong type="submit" className="mr-5" icon="delete">
          Reduce
        </ButtonStrong>
        <ButtonPrimary
          type="button"
          className="ml-5"
          icon="cancel"
          onClick={closeModalReduceProductWarehouse}
        >
          Cancel
        </ButtonPrimary>
      </div>
    </Modal>
  );
};

export {
  ModalReduceProductWarehouse,
  closeModalReduceProductWarehouse,
  openModalReduceProductWarehouse
};
