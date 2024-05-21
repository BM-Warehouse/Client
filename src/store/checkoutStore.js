// src/store/checkoutStore.js

import { create } from 'zustand';

import { addCartToCheckout, getCheckoutsUser, getDetailCheckoutUser } from '@/fetching/checkout';

const useCheckoutStore = create((set) => ({
  userCheckouts: [],
  detailCheckoutUser: null,

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
  },

  asyncGetDetailCheckoutUser: async (checkoutId) => {
    try {
      const detailCheckoutUser = await getDetailCheckoutUser(checkoutId);
      set({ detailCheckoutUser });
    } catch (error) {
      console.error('Error in asyncGetCheckoutDetail:', error.message);
    }
  }
}));

export default useCheckoutStore;
