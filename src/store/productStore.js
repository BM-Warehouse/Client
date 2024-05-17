import { create } from 'zustand';

import {
  getAllProducts,
  getProductById,
  deleteProductById,
  addProductToWarehouse,
  moveProductWarehouse
} from '@/fetching/product';

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
  },
  async asyncDeleteProduct(id) {
    try {
      await deleteProductById(id);
      set((state) => ({
        productsData: state.productsData.filter((product) => product.id !== id)
      }));
    } catch (error) {
      console.error('Error in asyncDeleteProduct:', error.message);
    }
  },
  async asyncAddProductToWarehouse(productId, warehouseId, quantity) {
    try {
      await addProductToWarehouse(productId, warehouseId, quantity);
      set((state) => ({
        productsData: state.productsData.map((product) =>
          product.id === productId ? { ...product, stock: product.stock + quantity } : product
        )
      }));
    } catch (error) {
      console.error('Error in asyncAddProductToWarehouse:', error.message);
    }
  },
  async asyncMoveProductWarehouse(productId, fromWarehouseId, toWarehouseId, quantity) {
    try {
      await moveProductWarehouse(productId, fromWarehouseId, toWarehouseId, quantity);
    } catch (error) {
      console.error('Error in asyncMoveProductWarehouse:', error.message);
    }
  }
}));

export default useProductStore;
