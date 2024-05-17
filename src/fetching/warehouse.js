import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllWarehouses = async () => {
  const response = await fetchWithToken(`${BASE_URL}/warehouses`);
  const data = await response.json();

  const warehouseData = data.data.warehouses.warehouses;

  return warehouseData;
};

const getWarehouseDetails = async (id) => {
  const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`);
  const warehouseDetails = await response.json();

  return warehouseDetails;
};

const getWarehouseName = async (id) => {
  const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`);
  const warehouseDetails = await response.json();

  return warehouseDetails.data.warehouse.name;
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

const getWarehouseQuantities = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/warehouses/quantities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch warehouse quantities');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getAllWarehouses,
  getWarehouseDetails,
  addWarehouse,
  getWarehouseQuantities,
  getWarehouseName
};
