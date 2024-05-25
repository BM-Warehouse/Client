/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { FaBox, FaExclamationTriangle, FaHourglassHalf } from 'react-icons/fa';

import { getAllCheckout } from '@/fetching/checkout';

const CheckoutInfoButton = () => {
  const [packingOrders, setPackingOrders] = useState([]);
  const [complainOrders, setComplainOrders] = useState([]);
  const [waitingPaymentOrders, setWaitingPaymentOrders] = useState([]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await getAllCheckout();
        if (response !== null) {
          const checkouts = response.checkouts;
          const packing = checkouts.filter((item) => item.status === 'PACKING');
          const complain = checkouts.filter((item) => item.status === 'COMPLAIN');
          const waitingPayment = checkouts.filter((item) => item.status === 'WAIT FOR PAYMENT');

          setPackingOrders(packing);
          setComplainOrders(complain);
          setWaitingPaymentOrders(waitingPayment);
        }
      } catch (error) {
        console.error('Failed to fetch checkouts:', error);
      }
    };

    fetchCheckouts();
  }, []);

  const handleNavigateToFirstPackingOrder = () => {
    if (packingOrders.length > 0) {
      const firstPackingOrder = packingOrders[0];
      window.location.href = `/orders/${firstPackingOrder.id}`;
    } else {
      toast.error('No packing orders available');
    }
  };

  const handleNavigateToFirstComplainOrder = () => {
    if (complainOrders.length > 0) {
      const firstComplainOrder = complainOrders[0];
      window.location.href = `/orders/${firstComplainOrder.id}`;
    } else {
      toast.error('No complain orders available');
    }
  };

  const handleNavigateToFirstWaitingPaymentOrder = () => {
    if (waitingPaymentOrders.length > 0) {
      const firstWaitingPaymentOrder = waitingPaymentOrders[0];
      window.location.href = `/orders/${firstWaitingPaymentOrder.id}`;
    } else {
      toast.error('No orders waiting for payment available');
    }
  };

  const packingButtonColor =
    packingOrders.length === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-danger hover:bg-red-400';
  const complainButtonColor =
    complainOrders.length === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-danger hover:bg-red-400';
  const waitingPaymentButtonColor =
    waitingPaymentOrders.length === 0
      ? 'bg-green-500 hover:bg-green-600'
      : 'bg-danger hover:bg-red-400';

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleNavigateToFirstPackingOrder}
        className={`flex items-center px-4 py-2 text-white rounded-lg ${packingButtonColor}`}
      >
        <FaBox className="mr-2 text-2xl" />
        <p className="text-lg">Packing Orders : {packingOrders.length}</p>
      </button>
      <button
        onClick={handleNavigateToFirstComplainOrder}
        className={`flex items-center px-4 py-2 text-white rounded-lg ${complainButtonColor}`}
      >
        <FaExclamationTriangle className="mr-2 text-2xl" />
        <p className="text-lg">Complain Orders : {complainOrders.length}</p>
      </button>
      <button
        onClick={handleNavigateToFirstWaitingPaymentOrder}
        className={`flex items-center px-4 py-2 text-white rounded-lg ${waitingPaymentButtonColor}`}
      >
        <FaHourglassHalf className="mr-2 text-2xl" />
        <p className="text-lg">Waiting for Payment : {waitingPaymentOrders.length} </p>
      </button>
    </div>
  );
};

export default CheckoutInfoButton;
