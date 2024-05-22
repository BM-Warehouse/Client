/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';

import { FaBox, FaCheck } from 'react-icons/fa';

import { getAllCheckout } from '@/fetching/checkout';
import useModalStore from '@/hooks/useModalStore';

const CheckoutInfoButton = () => {
  const [packingOrders, setPackingOrders] = useState([]);
  const [sentOrders, setSentOrders] = useState([]);
  const { isOpen, title, body, buttonLabel, openModal, closeModal } = useModalStore();

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await getAllCheckout();
        if (response !== null) {
          const checkouts = response.checkouts;
          const packing = checkouts.filter((item) => item.status === 'PACKING');
          const sent = checkouts.filter((item) => item.status === 'SENT');
          setPackingOrders(packing);
          setSentOrders(sent);
        }
      } catch (error) {
        console.error('Failed to fetch checkouts:', error);
      }
    };

    fetchCheckouts();
  }, []);

  const handleOpenOrderModal = (order) => {
    const modalBody = (
      <div>
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Total Price:</strong> {order.totalPrice}
        </p>
        <a href={`/orders/${order.id}`} className="text-blue-500">
          Go to
        </a>
      </div>
    );

    openModal(`Order Details: ${order.id}`, modalBody, 'Close');
  };

  const handleOpenPackingOrdersModal = () => {
    const modalBody = (
      <div className="space-y-2">
        {packingOrders.map((order) => (
          <button
            key={order.id}
            onClick={() => handleOpenOrderModal(order)}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Order ID: {order.id}
          </button>
        ))}
      </div>
    );

    openModal('Packing Orders', modalBody, 'Close');
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleOpenPackingOrdersModal}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <FaBox className="mr-2" />
        Info Barang Packing: {packingOrders.length}
      </button>

      <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        <FaCheck className="mr-2" />
        Info Barang Sent: {sentOrders.length}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {body}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutInfoButton;
