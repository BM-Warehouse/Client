/* eslint-disable no-console */
import { create } from 'zustand';

import { login } from '@/fetching/auth';
import { getOwnProfile } from '@/fetching/user';
import { setAccessToken } from '@/lib/fetchLib';

const useAuthUserStore = create((set) => ({
  authUser: null,
  role: null,
  asyncSetAuthUser: async ({ username, password }) => {
    try {
      const token = await login({ username, password });
      setAccessToken(token);
      const user = await getOwnProfile();
      set((_state) => ({
        authUser: user,
        role: user.role
      }));
    } catch (error) {
      console.error('Error in asyncFunc:', error.message);
    }
  },
  asyncUnsetAuthUser: async () => {
    try {
      set((_state) => ({
        authUser: null,
        role: null
      }));
      setAccessToken('');
    } catch (error) {
      console.error('Error in asyncFunc:', error.message);
    }
  }
}));

export default useAuthUserStore;
