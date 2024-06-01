import React, { useContext } from 'react';

import { toast } from 'react-hot-toast';

import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { Modal } from '@/components/parts/Modal';
import { deleteCheckout, getAllOrders } from '@/fetching/orders';

import { ListOrderContext } from './context';

const modalId = 'modal-delete-order';
let checkoutId = null;

const openModalDeleteOrder = (id) => {
  checkoutId = id;
  document.getElementById(modalId).showModal();
};

const closeModalDeleteOrder = () => {
  document.getElementById(modalId).close();
};

const ModalDeleteOrder = () => {
  const { setData, pagination } = useContext(ListOrderContext);

  const handelConfirm = () => {
    deleteCheckout(checkoutId).then(() => {
      toast.success('Successfully delete the checkout list');
      getAllOrders(pagination.currentPage)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data.checkouts);
          closeModalDeleteOrder();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  return (
    <Modal id={modalId} title="Delete Order" description="Are you sure want to delete the order?">
      <div className="flex justify-center">
        <ButtonStrong icon="delete" onClick={handelConfirm}>
          Delete
        </ButtonStrong>
        <ButtonPrimary icon="cancel" onClick={closeModalDeleteOrder}>
          Cancel
        </ButtonPrimary>
      </div>
    </Modal>
  );
};

export default ModalDeleteOrder;

export { openModalDeleteOrder, closeModalDeleteOrder };
