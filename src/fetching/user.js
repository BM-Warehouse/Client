import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllUsers = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    console.log(response);
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { users }
    } = responseJson;
    console.log(response);
    return users;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const getUserDetail = async (id) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { user }
    } = responseJson;
    return user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const getOwnProfile = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { me }
    } = responseJson;
    console.log(responseJson);
    return me;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export { getOwnProfile, getUserDetail, getAllUsers };
