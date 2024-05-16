import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllCarts = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/cart/all`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { carts }
    } = responseJson;
    return carts;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data all carts:', error.message);
    throw error;
  }
};

const showUserCart = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/cart`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { cart }
    } = responseJson;
    return cart;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data cart:', error.message);
    throw error;
  }
};

const resetCartToDefault = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/cart`, {
      method: 'POST',
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
      data: { cart }
    } = responseJson;
    return cart;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error login:', error.message);
    throw error;
  }
};
const addProductToCart = async (payload) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { cart }
    } = responseJson;
    return cart;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error login:', error.message);
    throw error;
  }
};
const deleteCartProduct = async (id) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/cart/${id}`, {
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
    const { data } = responseJson;
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error login:', error.message);
    throw error;
  }
};

export { getAllCarts, showUserCart, resetCartToDefault, addProductToCart, deleteCartProduct };
