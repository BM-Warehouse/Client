import { create } from 'zustand';

import { getAllCategories, getCategoryDetail } from '@/fetching/category';

const useCategryStore = create((set) => ({
  categoriesData: [],
  categoryDetail: null,
  asyncGetAll: async () => {
    try {
      const categories = await getAllCategories();
      set((_state) => ({
        categoriesData: categories
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  asyncGetDetail: async (id) => {
    try {
      const category = await getCategoryDetail(id);
      set((_state) => ({
        categoryDetail: category
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  }
}));

export default useCategryStore;
