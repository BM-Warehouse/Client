/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';

import { FaBox } from 'react-icons/fa';

import { getAllCheckout } from '@/fetching/checkout';

const CheckoutInfoButton = () => {
  const [packingOrders, setPackingOrders] = useState([]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await getAllCheckout();
        if (response !== null) {
          const checkouts = response.checkouts;
          const packing = checkouts.filter((item) => item.status === 'PACKING');
          setPackingOrders(packing);
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
      alert('No packing orders available');
    }
  };

  const buttonColor =
    packingOrders.length === 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleNavigateToFirstPackingOrder}
        className={`flex items-center px-4 py-2 text-white rounded ${buttonColor}`}
      >
        <FaBox className="mr-2" />
        {packingOrders.length}
      </button>
    </div>
  );
};

export default CheckoutInfoButton;
