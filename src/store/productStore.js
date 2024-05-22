import { create } from 'zustand';

import {
  getAllProducts,
  getProductById,
  deleteProductById,
  addProductToWarehouse,
  moveProductWarehouse,
  addDamageProduct,
  addProduct,
  editProduct
} from '@/fetching/product';

const useProductStore = create((set) => ({
  productsData: [],
  allProductsData: [],
  detailProduct: null,
  newProduct: null,
  pagination: {
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  },
  filteredPagination: {
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
  },
  async asyncReduceProduct(productId, warehouseId, quantity) {
    try {
      await addDamageProduct(productId, warehouseId, quantity);
      set((state) => ({
        productsData: state.productsData.map((product) =>
          product.id === productId ? { ...product, stock: product.stock - quantity } : product
        )
      }));
    } catch (error) {
      console.error('Error in asyncReduceProduct:', error.message);
    }
  },
  async asyncAddProduct(name, price, description, imageUrl) {
    try {
      const newProduct = await addProduct(name, price, description, imageUrl);
      set((state) => ({
        productsData: [newProduct, ...state.productsData],
        newProduct
      }));
    } catch (error) {
      console.error('Error in asyncAddProduct:', error.message);
    }
  },
  async asyncEditProduct(id, name, price, description, imageUrl) {
    try {
      const updatedProduct = await editProduct(id, name, price, description, imageUrl);
      set((state) => ({
        productsData: state.productsData.map((product) =>
          product.id === id ? updatedProduct : product
        ),
        detailProduct: state.detailProduct?.id === id ? updatedProduct : state.detailProduct
      }));
    } catch (error) {
      console.error('Error in asyncEditProduct:', error.message);
    }
  },
  async asyncGetAllFullProducts(page = 1, limit = 99999) {
    try {
      const data = await getAllProducts(page, limit);
      set((_state) => ({
        allProductsData: data.products,
        filterPagination: data.pagination
      }));
    } catch (error) {
      console.error('Error in asyncGetAll:', error.message);
    }
  }
}));

export default useProductStore;
