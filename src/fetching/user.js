import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllUsers = async (
  contains = '',
  page = 1,
  limit = 10,
  orderBy = 'id',
  orderType = 'asc'
) => {
  let response = null;
  try {
    if (!contains) {
      response = await fetchWithToken(
        `${BASE_URL}/users?${new URLSearchParams({
          page,
          limit,
          orderBy,
          orderType
        })}`
      );
    } else {
      const url = `${BASE_URL}/users?${new URLSearchParams({
        page,
        limit,
        orderBy,
        orderType,
        contains
      })}`;

      response = await fetchWithToken(url);
    }
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const { data } = responseJson;
    return data;
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

const createUser = async (
  fullName,
  email,
  username,
  password,
  phone,
  address,
  gender,
  birthdate,
  avatar,
  role
) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        fullName,
        email,
        username,
        password,
        phone,
        address,
        gender,
        birthdate,
        avatar,
        role
      )
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const updateUser = async (
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
) => {
  try {
    console.log({
      email,
      username,
      password,
      name,
      phone,
      address,
      gender,
      birthdate,
      role,
      avatar
    });
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password,
        phone,
        address,
        gender,
        birthdate,
        avatar,
        role
      })
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const destroyUserById = async (id) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
    // console.log(responseJson);
    return me;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export { getOwnProfile, getUserDetail, getAllUsers, createUser, updateUser, destroyUserById };
