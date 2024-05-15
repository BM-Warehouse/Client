import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllProducts = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/products`);
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
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/products/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { product }
    } = responseJson;
    return product;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export { getAllProducts, getProductById };
