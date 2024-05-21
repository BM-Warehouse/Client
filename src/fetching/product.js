import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getAllProducts = async (page = 1, limit = 10, contains = '') => {
  try {
    const param = new URLSearchParams({
      page,
      limit
    });

    if (contains) {
      param.append('contains', contains);
    }

    const response = await fetchWithToken(`${BASE_URL}/products?${param}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const { data } = responseJson;
    return data;
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

const addProduct = async (name, price, description, imageUrl) => {
  try {
    const requestBody = {
      name,
      price,
      description,
      imageUrl
    };
    // console.log(productId, warehouseId, quantity);
    const response = await fetchWithToken(`${BASE_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
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

const editProduct = async (id, name, price, description, imageUrl) => {
  try {
    const requestBody = {
      id,
      name,
      price,
      description,
      imageUrl
    };
    // console.log(productId, warehouseId, quantity);
    const response = await fetchWithToken(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
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

const deleteProductById = async (id) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/products/${id}`, {
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
      data: { product }
    } = responseJson;
    return product;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const addProductToWarehouse = async (productId, warehouseId, quantity) => {
  try {
    const requestBody = {
      productId,
      warehouseId,
      quantity
    };
    // console.log(productId, warehouseId, quantity);
    const response = await fetchWithToken(`${BASE_URL}/products/warehouse/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    return responseJson;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const moveProductWarehouse = async (productId, fromWarehouseId, toWarehouseId, quantity) => {
  try {
    const requestBody = {
      productId,
      warehouseId: {
        from: fromWarehouseId,
        to: toWarehouseId
      },
      quantity
    };

    const response = await fetchWithToken(`${BASE_URL}/products/warehouse/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    // const { data } = responseJson;
    return responseJson;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const addDamageProduct = async (productId, warehouseId, quantity) => {
  try {
    const requestBody = {
      productId,
      warehouseId,
      quantity
    };
    // console.log(productId, warehouseId, quantity);
    const response = await fetchWithToken(`${BASE_URL}/products/damage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    return responseJson;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export {
  getAllProducts,
  getProductById,
  deleteProductById,
  addProductToWarehouse,
  moveProductWarehouse,
  addDamageProduct,
  addProduct,
  editProduct
};
