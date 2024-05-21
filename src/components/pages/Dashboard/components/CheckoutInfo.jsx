import React, { useEffect, useState } from 'react';

import { getAllCheckout } from '@/fetching/checkout';

const CheckoutInfoButton = () => {
  const [packingCount, setPackingCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await getAllCheckout();
        // console.log(response);
        if (response !== null) {
          // eslint-disable-next-line prefer-destructuring
          const checkouts = response.checkouts;
          console.log(checkouts);
          const packing = checkouts.filter((item) => item.status === 'PACKING').length;
          const sent = checkouts.filter((item) => item.status === 'SENT').length;
          setPackingCount(packing);
          setSentCount(sent);
        }
      } catch (error) {
        console.error('Failed to fetch checkouts:', error);
      }
    };

    fetchCheckouts();
  }, []);

  return (
    <button>
      Info Barang: {packingCount} Packing, {sentCount} Sent
    </button>
  );
};

export default CheckoutInfoButton;
