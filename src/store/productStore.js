/* eslint-disable no-console */
import { create } from 'zustand';

import { getAllProducts, getProductById } from '@/fetching/product';

const useProductStore = create((set) => ({
  productsData: [],
  detailProduct: null,
  asyncGetAll: async () => {
    try {
      const products = await getAllProducts();
      set((_state) => ({
        productsData: products
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error.message);
    }
  },
  asyncGetDetail: async (id) => {
    try {
      const detail = await getProductById(id);
      set((_state) => ({
        detailProduct: detail
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error.message);
    }
  }
}));

export default useProductStore;
