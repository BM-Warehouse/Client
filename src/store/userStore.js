import { create } from 'zustand';

import { getAllUsers, getUserDetail, addUser } from '@/fetching/user';

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
  },
  asyncAddUser: async (
    fullName,
    email,
    username,
    password,
    phone,
    address,
    gender,
    birthdate,
    role,
    avatar
  ) => {
    try {
      const newUser = await addUser(
        fullName,
        email,
        username,
        password,
        phone,
        address,
        gender,
        birthdate,
        role,
        avatar
      );
      set((_state) => ({
        newUser
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  }
  // asyncDestroy: async (id) => {
  //   try {
  //     await destroyUser(id);
  //     set((_state) => ({
  //       usersData: state.usersData.filter((user) => user.id !== id)
  //     }));
  //   } catch (error) {
  //     console.error('Error in asyncFunc:', error);
  //   }
  // }
}));

export default useUsersStore;
