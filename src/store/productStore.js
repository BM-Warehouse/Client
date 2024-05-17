/* eslint-disable no-console */
import { create } from 'zustand';

import { getAllProducts, getProductById } from '@/fetching/product';

const useProductStore = create((set) => ({
  productsData: [],
  detailProduct: null,
  pagination: {
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  },
  async asyncGetAll(page = 1) {
    try {
      const data = await getAllProducts(page);
      set((_state) => ({
        productsData: data.products,
        pagination: data.pagination
      }));
    } catch (error) {
      console.error('Error in asyncGetAll:', error.message);
    }
  },
  async asyncGetDetail(id) {
    try {
      const detail = await getProductById(id);
      set((_state) => ({
        detailProduct: detail
      }));
    } catch (error) {
      console.error('Error in asyncGetDetail:', error.message);
    }
  }
}));

export default useProductStore;
