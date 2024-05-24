// src/store/checkoutStore.js

import { create } from 'zustand';

import {
  addCartToCheckout,
  getCheckoutsUser,
  getCouriers,
  getDetailCheckoutUser,
  setFeedback
} from '@/fetching/checkout';

const useCheckoutStore = create((set) => ({
  userCheckouts: [],
  couriers: [],
  detailCheckoutUser: null,

  asyncAddCartToCheckout: async (cartId, courierId, address, method) => {
    try {
      await addCartToCheckout(cartId, courierId, address, method);
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
  },
  asyncSetFeedback: async (checkoutId, feedbackId) => {
    try {
      await setFeedback(checkoutId, feedbackId);
    } catch (error) {
      console.error('Error in asyncSetFeedback:', error.message);
    }
  },
  asyncGetCouriers: async () => {
    try {
      const data = await getCouriers();
      set((_state) => ({
        couriers: data.couriers
      }));
    } catch (error) {
      console.error('Error in asyncGetCouriers:', error.message);
    }
  }
}));

export default useCheckoutStore;
