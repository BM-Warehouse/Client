import { create } from 'zustand';

import {
  addCategory,
  editCategory,
  getAllCategories,
  getCategoryDetail,
  removeCategory,
  setCategoryProduct
} from '@/fetching/category';

const useCategoryStore = create((set) => ({
  categoriesData: [],
  categoryDetail: null,
  productCategories: [],
  newCategory: null,
  pagination: {
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  },
  asyncGetAllCategory: async (contains, page, limit, orderBy, orderType) => {
    try {
      const data = await getAllCategories(contains, page, limit, orderBy, orderType);
      set((_state) => ({
        categoriesData: data.categories,
        pagination: data.pagination
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  asyncGetDetailCategory: async (id) => {
    try {
      const pc = await getCategoryDetail(id);
      const { name, description, imageUrl, productCategories } = pc[0];
      set((_state) => ({
        categoryDetail: { name, description, imageUrl },
        productCategories
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  // eslint-disable-next-line consistent-return
  asyncAddCategory: async (payload) => {
    try {
      const newCategory = await addCategory(payload);
      set((_state) => ({
        newCategory
      }));
      return newCategory;
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  // eslint-disable-next-line consistent-return
  asyncEditCategory: async (id, payload) => {
    try {
      const editedCategory = await editCategory(id, payload);
      set((_state) => ({
        editedCategory
      }));
      return editedCategory;
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  // eslint-disable-next-line consistent-return
  asyncRemoveCategory: async (id) => {
    try {
      const removedCategory = await removeCategory(id);
      set((_state) => ({
        removedCategory
      }));
      return removedCategory;
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  asyncGetAllWithoutPagination: async (contains, page = 1, limit = 99999) => {
    try {
      const data = await getAllCategories(contains, page, limit);
      set((_state) => ({
        categoriesData: data.categories,
        pagination: data.pagination
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  async asyncSetCategoryProduct(productId, categoryId) {
    try {
      await setCategoryProduct(productId, categoryId);
    } catch (error) {
      console.error('Error in asyncAddProductToWarehouse:', error.message);
    }
  }
}));

export default useCategoryStore;
