import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllWarehouses = async () => {
  try{
    const response = await fetchWithToken(`${BASE_URL}/warehouses`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: {
        warehouses: { warehouses }
      }
    } = responseJson;

    return warehouses;
  } catch (error) {
      // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const getWarehouseDetails = async (id) => {
  const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const { data: {warehouse} } = responseJson;
    console.log(warehouse);
    return warehouse;
};

const addWarehouse = async (params) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/warehouses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const editWarehouse = async (id, params) => {
  try{
    const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteWarehouse = async (id) => {
  try{
    const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
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
    throw new Error(error);
  }
};

export { getAllWarehouses, getWarehouseDetails, addWarehouse, editWarehouse, deleteWarehouse };
