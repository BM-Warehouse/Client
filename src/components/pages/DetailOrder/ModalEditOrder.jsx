import React, { useContext } from 'react';

import { toast } from 'react-hot-toast';

import { ButtonPrimary } from '@/components/parts/Button';
import { Modal, Select, TextArea } from '@/components/parts/Modal';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { editCheckout, getDetailOrder } from '@/fetching/orders';

const modalId = 'modal-edit-checkout';

const openModalEditOrder = () => {
  document.getElementById(modalId).showModal();
};

const closeModalEditOrder = () => {
  document.getElementById(modalId).close();
};

const ModalEditOrder = ({ checkoutId }) => {
  const {
    allData, // contain all detailOrderr Data
    setAllData,
    setData,
    setStatus,
    setTotalPrice,
    setPagination,
    setTotalProductPrice,
    setCourierPrice,
    users,
    couriers
  } = useContext(DetailOrderContex);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const userId = form.get('userId');
    const courierId = form.get('courierId');
    const method = form.get('method');
    const address = form.get('address');

    console.log(checkoutId, userId, courierId, method, address);
    editCheckout({ checkoutId, userId, address, method, courierId })
      .then((r) => {
        console.log(r);
        getDetailOrder(checkoutId)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Failed to fetch detail order');
            }
            return res.json();
          })
          .then((detailOrderData) => {
            toast.success('order updated successfully');
            setAllData(detailOrderData.data);
            setData(detailOrderData.data.checkout.productCheckout);
            setStatus(detailOrderData.data.checkout.status);
            setPagination(detailOrderData.data.pagination);
            setTotalPrice(detailOrderData.data.checkout.totalPrice);
            setTotalProductPrice(detailOrderData.data.checkout.totalProductPrice);
            setCourierPrice(detailOrderData.data.checkout.couriers.price);
            closeModalEditOrder();
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // useEffect(() => {
  //   console.log("All --> ", allData.checkout);
  //   console.log("User length --> ", users.length);
  //   console.log("User --> ", users);
  //   console.log("Couriers --> ", couriers);
  // }, [users, allData, couriers]);

  return (
    <Modal id={modalId} title="Edit Order" onSubmit={handleSubmit}>
      {users.length !== 0 && (
        <Select label="Username" name="userId" defaultValue={allData.checkout.userId}>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username} ({u.fullName})
            </option>
          ))}
        </Select>
      )}

      <TextArea label="Address" name="address" defaultValue={allData.checkout.address} />

      {couriers.length !== 0 && (
        <Select label="Courier" name="courierId" defaultValue={allData.checkout.courierId}>
          {couriers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - {c.price}
            </option>
          ))}
        </Select>
      )}

      <Select label="Method" name="method" defaultValue={allData.checkout.method}>
        <option value=""> - </option>
        <option value="OFFLINE">OFFLINE</option>
        <option value="ONLINE">ONLINE</option>
        <option value="B2B">B2B</option>
      </Select>
      <div className="flex items-center justify-evenly">
        <ButtonPrimary icon="edit" type="submit">
          Submit
        </ButtonPrimary>
        <ButtonPrimary icon="cancel" onClick={closeModalEditOrder}>
          Cancel
        </ButtonPrimary>
      </div>
    </Modal>
  );
};

export default ModalEditOrder;

export { openModalEditOrder, closeModalEditOrder };
