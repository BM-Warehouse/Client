/* eslint-disable no-console */
import { create } from 'zustand';

import { showUserCart } from '@/fetching/cart';

const useCartStore = create((set) => ({
  cart: null,

  asyncShowCart: async () => {
    try {
      const mycart = await showUserCart();
      set((_state) => ({
        cart: mycart
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error.message);
    }
  }
}));

export default useCartStore;
