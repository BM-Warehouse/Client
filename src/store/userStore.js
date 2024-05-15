import { create } from 'zustand';

import { getAllUsers } from '@/fetching/user';

const useUsersStore = create((set) => ({
  usersData: [],
  asyncGetAll: async () => {
    try {
      const users = await getAllUsers();
      set((_state) => ({
        usersData: users
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  }
}));

export default useUsersStore;
