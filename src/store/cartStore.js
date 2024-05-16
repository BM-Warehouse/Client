/* eslint-disable no-console */
import { create } from 'zustand';

import {
  showUserCart,
  addProductToCart,
  deleteCartProduct,
  resetCartToDefault
} from '@/fetching/cart';

const useCartStore = create((set) => ({
  cart: null,

  asyncShowCart: async () => {
    try {
      const mycart = await showUserCart();
      set((_state) => ({
        cart: mycart
      }));
    } catch (error) {
      console.error('Error in asyncShowCart:', error.message);
    }
  },

  asyncAddProductToCart: async (payload) => {
    try {
      const updatedCart = await addProductToCart(payload);
      set((_state) => ({
        cart: updatedCart
      }));
    } catch (error) {
      console.error('Error in asyncAddProductToCart:', error.message);
    }
  },

  asyncDeleteCartProduct: async (id) => {
    try {
      await deleteCartProduct(id);
      // set((_state) => ({
      //   cart
      // }));
    } catch (error) {
      console.error('Error in asyncDeleteCartProduct:', error.message);
    }
  },

  asyncResetCartToDefault: async () => {
    try {
      const defaultCart = await resetCartToDefault();
      set((_state) => ({
        cart: defaultCart
      }));
    } catch (error) {
      console.error('Error in asyncResetCartToDefault:', error.message);
    }
  }
}));

export default useCartStore;
