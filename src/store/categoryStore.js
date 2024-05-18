import { create } from 'zustand';

import {
  addCategory,
  editCategory,
  getAllCategories,
  getCategoryDetail,
  removeCategory
} from '@/fetching/category';

const useCategryStore = create((set) => ({
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
  asyncGetAll: async (contains, page = 1) => {
    try {
      const data = await getAllCategories(contains, page);
      set((_state) => ({
        categoriesData: data.categories,
        pagination: data.pagination
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  asyncGetDetail: async (id) => {
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
  asyncAddCategory: async (name, description, imageUrl) => {
    try {
      const newCategory = await addCategory(name, description, imageUrl);
      set((_state) => ({
        newCategory
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  asyncEditCategory: async (id, name, description, imageUrl) => {
    try {
      const editedCategory = await editCategory(id, name, description, imageUrl);
      set((_state) => ({
        editedCategory
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  asyncRemoveCategory: async (id) => {
    try {
      const removedCategory = await removeCategory(id);
      set((_state) => ({
        removedCategory
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  }
}));

export default useCategryStore;
