/* eslint-disable no-console */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { login } from '@/fetching/auth';
import { getOwnProfile } from '@/fetching/user';
import { removeAccessToken, setAccessToken } from '@/lib/fetchLib';

const useAuthUserStore = create(
  persist(
    (set) => ({
      authUser: null,
      role: null,
      asyncSetAuthUser: async ({ username, password }) => {
        try {
          const token = await login({ username, password });
          if (!token) {
            // toast.error('Incorrect username or password. Please try again!');
            throw new Error('Incorrect username or password. Please try again!');
          }
          setAccessToken(token);
          const user = await getOwnProfile();
          // console.log(user);
          set(() => ({
            authUser: user,
            role: user.role
          }));
        } catch (error) {
          console.error('Error in asyncSetAuthUser:', error.message);
          throw error;
        }
      },
      asyncUnsetAuthUser: async () => {
        try {
          set(() => ({
            authUser: null,
            role: null
          }));
          setAccessToken('');
          removeAccessToken();
        } catch (error) {
          console.error('Error in asyncUnsetAuthUser:', error.message);
        }
      }
    }),
    {
      name: 'auth-user-storage', // Nama key yang digunakan di local storage
      storage: createJSONStorage(() => localStorage) // Menggunakan localStorage
    }
  )
);

export default useAuthUserStore;
