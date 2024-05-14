import { create } from 'zustand';

import { getAllCategories } from '@/fetching/category';

const useCategryStore = create((set) => ({
  categoriesData: [],
  asyncGetAll: async () => {
    try {
      const categories = await getAllCategories();
      set((_state) => ({
        categoriesData: categories
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  }
}));

export default useCategryStore;
