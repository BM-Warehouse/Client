import { create } from 'zustand';

import { getAllUsers, getUserDetail } from '@/fetching/user';

const useUsersStore = create((set) => ({
  usersData: [],
  userDetail: null,
  asyncGetAll: async () => {
    try {
      const users = await getAllUsers();
      set((_state) => ({
        usersData: users
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },
  asyncGetDetail: async (id) => {
    try {
      const user = await getUserDetail(id);
      set((_state) => ({
        userDetail: user
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  }
}));

export default useUsersStore;
