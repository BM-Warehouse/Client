import React, { useContext } from 'react';

import { toast } from 'react-hot-toast';

import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { deleteProductFromCheckout, getDetailOrder } from '@/fetching/orders';

const modalId = 'delete-modal';

const openModalDeleteVerification = () => {
  document.getElementById(modalId).showModal();
};

const closeModalDeleteVerification = () => {
  document.getElementById(modalId).close();
};

const ModalDeleteVerification = ({ checkoutId }) => {
  const { selectedProduct, setData, page, setTotalPrice, setPagination, setTotalProductPrice } =
    useContext(DetailOrderContex);

  const handleDelete = () => {
    console.log(`Deleteting product id ${selectedProduct.id}`);
    deleteProductFromCheckout(checkoutId, selectedProduct.id)
      .then(() => {
        getDetailOrder(checkoutId, page)
          .then((res) => res.json())
          .then((res) => {
            setData(res.data.checkout.productCheckout);
            setPagination(res.data.pagination);
            setTotalPrice(res.data.checkout.totalPrice);
            setTotalProductPrice(res.data.checkout.totalProductPrice);
          })
          .catch((e) => {
            toast.error('getDetailOrder Error', e);
          });
        toast.success('Delete Success');
      })
      .catch((e) => {
        console.log(e);
        toast.error('Delete Fail', e);
      });
    closeModalDeleteVerification();
  };

  const handleCancel = () => {
    closeModalDeleteVerification();
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box h-auto w-auto max-w-full">
        <div>
          <h2 className="font-bold text-lg">Delete Product</h2>
          <p className="py-4">
            Are you sure want to delete <b>{selectedProduct?.name}</b> from checkout list?
          </p>
          <div className="flex items-center justify-evenly">
            <ButtonStrong icon="delete" onClick={handleDelete}>
              Delete
            </ButtonStrong>
            <ButtonPrimary icon="cancel" onClick={handleCancel}>
              Cancel
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalDeleteVerification;

export { openModalDeleteVerification, closeModalDeleteVerification };
