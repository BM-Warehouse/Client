/* eslint-disable no-console */
import BASE_URL from '@/lib/baseUrl';

const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { products }
    } = responseJson;
    return products;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export { getAllProducts };
