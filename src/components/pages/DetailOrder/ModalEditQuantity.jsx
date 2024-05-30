import React, { useContext, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { editProductInCheckout, getDetailOrder } from '@/fetching/orders';

const modalId = 'edit-quantity-modal';

const openModalEditQuantity = () => {
  document.getElementById(modalId).showModal();
};

const closeModalEditQuantity = () => {
  document.getElementById(modalId).close();
};

const ModalEditQuantity = ({ checkoutId }) => {
  const [quantity, setQuantity] = useState(0);
  const { selectedProduct, setData, page, setTotalPrice, setTotalProductPrice } =
    useContext(DetailOrderContex);

  const handleSubmit = () => {
    console.log(`Submitting quantity for product id ${selectedProduct.id}`);
    editProductInCheckout(checkoutId, selectedProduct.id, quantity).then(() => {
      getDetailOrder(checkoutId, page)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data.checkout.productCheckout);
          setTotalPrice(res.data.checkout.totalPrice);
          setTotalProductPrice(res.data.checkout.totalProductPrice);
        })
        .catch((e) => {
          toast.success(`getDetailOrder Error: ${e.message}`);
        });
    });
    closeModalEditQuantity();
  };

  const handleCancel = () => {
    closeModalEditQuantity();
  };

  const handleChange = (val) => {
    setQuantity(val);
  };

  useEffect(() => {
    if (selectedProduct?.quantity) setQuantity(selectedProduct.quantity);
  }, [selectedProduct]);

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box h-auto w-auto max-w-full ">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-lg mb-5">Update Product Quantity</h2>
          <div>
            <label htmlFor="" className="mr-4">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              className="input input-bordered w-32 max-w-xs"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <ButtonPrimary icon="edit" onClick={handleSubmit}>
              Submit
            </ButtonPrimary>
            <ButtonStrong icon="cancel" onClick={handleCancel}>
              Cancel
            </ButtonStrong>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ModalEditQuantity;

export { openModalEditQuantity, closeModalEditQuantity };
