import { create } from 'zustand';

import { getAllUsers, getUserDetail, addUser, updateUser, destroyUserById } from '@/fetching/user';

const useUsersStore = create((set) => ({
  usersData: [],
  userDetail: null,
  newUser: null,
  pagination: {
    totalPage: null,
    totalData: null,
    nextPage: null,
    prevPage: null,
    currentPage: 1,
    limit: null
  },
  asyncGetAll: async (contains, page, limit, orderBy, orderType) => {
    try {
      const users = await getAllUsers(contains, page, limit, orderBy, orderType);
      set((_state) => ({
        usersData: users.users,
        pagination: users.pagination
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
  },

  asyncUpdateUser: async (
    id,
    { name, email, username, password, phone, address, gender, birthdate, role, avatar }
  ) => {
    try {
      const updatedUser = await updateUser(
        id,
        name,
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
        updatedUser
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  },

  asyncDestroyUser: async (id) => {
    try {
      await destroyUserById(id);
      set((state) => ({
        usersData: state.usersData.filter((user) => user.id !== id)
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error);
    }
  }
}));

export default useUsersStore;
