/* eslint-disable no-console */
import { create } from 'zustand';

import { getAllProducts } from '@/fetching/product';

const useProductStore = create((set) => ({
  productsData: [],
  asyncGetAll: async () => {
    try {
      const products = await getAllProducts();
      set((_state) => ({
        productsData: products
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error.message);
    }
  }
}));

export default useProductStore;
