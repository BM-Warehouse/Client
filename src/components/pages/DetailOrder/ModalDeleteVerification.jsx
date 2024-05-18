import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import React, { useContext, useEffect } from 'react'

const modalId = 'delete-modal'

const openModalDeleteVerification = () => {
  document.getElementById(modalId).showModal()
}

const closeModalDeleteVerification = () => {
  document.getElementById(modalId).close()
}

const ModalDeleteVerification = ({ show }) => {

  const { selectedProduct } = useContext(DetailOrderContex);

  const handleDelete = () => {
    console.log(`Deleteting product id ${selectedProduct?.id}`)
    closeModalDeleteVerification()
  }

  const handleCancel = () => {
    closeModalDeleteVerification()
  }

  return (
    <>
      <dialog id="delete-modal" className="modal">
        <div className="modal-box h-auto w-auto max-w-full">
          <div>
            <h2 className="font-bold text-lg">Delete Product</h2>
            <p className="py-4">Are you sure want to delete <b>{selectedProduct?.name}</b> from checkout list?</p>
            <div className="flex items-center justify-evenly">
              <ButtonStrong icon="delete" onClick={handleDelete}>Delete</ButtonStrong>
              <ButtonPrimary icon="cancel" onClick={handleCancel}>Cancel</ButtonPrimary>
            </div>
          </div>

        </div>
      </dialog>
    </>
  );
}

export default ModalDeleteVerification

export {
  openModalDeleteVerification,
  closeModalDeleteVerification
}
