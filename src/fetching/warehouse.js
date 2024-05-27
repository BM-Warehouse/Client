import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllWarehouses = async (page = 1, limit = 5) => {
  const url = `${BASE_URL}/warehouses?${new URLSearchParams({
    page,
    limit
  })}`;
  const response = await fetchWithToken(url);
  const responseJson = await response.json();
  const { status, message } = responseJson;
  if (status !== 'success') {
    throw new Error(message);
  }
  const { data } = responseJson;
  const warehouseData = data.warehouses;
  const { warehouses } = warehouseData;
  const { pagination } = data;

  return { warehouses, pagination };
};

// const getWarehouseDetails = async (id, page = 1, limit = 10) => {
//   try {
//     const url = `${BASE_URL}/warehouses/${id}?${new URLSearchParams({
//       page,
//       limit
//     })}`;
//     const response = await fetchWithToken(url);
//     const responseJson = await response.json();

//     if (responseJson.status !== 'success') {
//       throw new Error('Failed to retrieve warehouse data');
//     }

//     const warehouseArray = responseJson.data.warehouse.warehouse;
//     const warehouse = warehouseArray[0];
//     const { pagination } = responseJson.data;
//     console.log(warehouseArray);

//     if (!warehouse && warehouse?.id !== +id) {
//       throw new Error('Warehouse not found');
//     }

//     const warehouseDetails = {
//       name: warehouse.name,
//       products: warehouse.productsWarehouses.map((productWarehouse) => ({
//         productId: productWarehouse.product.id,
//         productName: productWarehouse.product.name,
//         quantity: productWarehouse.quantity
//       }))
//     };

//     return { warehouseDetails, pagination };
//   } catch (error) {
//     console.error('Error fetching warehouse details:', error);
//     throw error;
//   }
// };

const getWarehouseDetails = async (id, page = 1, limit = 10) => {
  try {
    const url = `${BASE_URL}/warehouses/${id}?${new URLSearchParams({
      page,
      limit
    })}`;
    const response = await fetchWithToken(url);
    const responseJson = await response.json();

    const { data } = responseJson;
    const { warehouse, pagination } = data;
    console.log(warehouse.warehouse[0]);
    const w = warehouse.warehouse[0];

    return { w, pagination };
  } catch (error) {
    console.error('Error fetching warehouse details:', error);
    throw error;
  }
};

const fetchBatches = async (productId, warehouseId, page = 1, limit = 5) => {
  const url = `${BASE_URL}/warehouses/batches?page=${page}&limit=${limit}`;

  try {
    const response = await fetchWithToken(url);
    if (!response.ok) {
      throw new Error(`Failed to retrieve batches data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching batches data:', error);
    throw error;
  }
};

const getWarehouseName = async (id) => {
  const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`);
  const warehouseDetails = await response.json();
  return warehouseDetails.data.warehouse[0].name;
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

const editWarehouse = async (id, name, address, city) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, address, city })
    });

    const updatedWarehouse = await response.json();

    return updatedWarehouse;
  } catch (error) {
    throw new Error(error);
  }
};

const removeWarehouse = async (id) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`, {
      method: 'DELETE'
    });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch:', error);
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

const deleteProductFromWarehouse = async (id) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/warehouses/${id}`, {
      method: 'DELETE'
    });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch:', error);
  }
};

export {
  getAllWarehouses,
  getWarehouseDetails,
  fetchBatches,
  addWarehouse,
  getWarehouseName,
  removeWarehouse,
  editWarehouse,
  getWarehouseQuantities,
  deleteProductFromWarehouse
};
