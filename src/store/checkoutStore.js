// src/store/checkoutStore.js

import { create } from 'zustand';

import { addCartToCheckout, getCheckoutsUser } from '@/fetching/checkout';

const useCheckoutStore = create((set) => ({
  userCheckouts: [],

  asyncAddCartToCheckout: async (cartId, courier, address, method) => {
    try {
      await addCartToCheckout(cartId, courier, address, method);
    } catch (error) {
      console.error('Error in asyncAddCartToCheckout:', error.message);
    }
  },

  asyncGetCheckoutsUser: async () => {
    try {
      const checkoutsUser = await getCheckoutsUser();
      set({ userCheckouts: checkoutsUser });
    } catch (error) {
      console.error('Error in asyncGetCheckoutsUser:', error.message);
    }
  }
}));

export default useCheckoutStore;
