import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllCategories = async () => {
  try {
    const respose = await fetchWithToken(`${BASE_URL}/categories`);
    const responseJson = await respose.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: {
        getAll: { categories }
      }
    } = responseJson;
    return categories;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const getCategoryDetail = async (id) => {
  try {
    const respose = await fetchWithToken(`${BASE_URL}/categories/${id}`);
    const responseJson = await respose.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const { data } = responseJson;
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const addCategory = async (name, description, imageUrl) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/categories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name, description, imageUrl)
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const editCategory = async (id, name, description, imageUrl) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(name, description, imageUrl)
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const removeCategory = async (id) => {
  try {
    await fetchWithToken(`${BASE_URL}/categories/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

export { getAllCategories, getCategoryDetail, addCategory, editCategory, removeCategory };
