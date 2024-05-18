import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

async function getAllOrders(page = 1, limit = 5) {
  const url = `${BASE_URL}/checkout?${new URLSearchParams({
    page,
    limit
  })}`;
  const response = await fetchWithToken(url);
  return response;
}
async function getDetailOrder(id, page = 1, limit = 5) {
  const url = `${BASE_URL}/checkout/${id}?${new URLSearchParams({
    page,
    limit
  })}`;
  const response = await fetchWithToken(url);
  return response;
}

async function sendOrder(checkoutId, warehouseSelections) {
  const data = {
    checkoutId: +checkoutId,
    warehouseSelections
  };
  const response = await fetchWithToken(`${BASE_URL}/checkout/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status !== 200) {
    const resJson = await response.json();
    throw new Error(JSON.stringify(resJson));
  }
  const resJson = await response.json();
  return resJson;
}

async function addProductToCheckout(checkoutId, productId, quantity) {
  const data = {
    checkoutId: +checkoutId,
    productId: +productId,
    quantity: +quantity
  };
  const response = await fetchWithToken(`${BASE_URL}/checkout/${checkoutId}/addProduct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status !== 200) {
    const resJson = await response.json();
    throw new Error(JSON.stringify(resJson));
  }
  const resJson = await response.json();
  return resJson;
}

async function editProductInCheckout(checkoutId, productId, quantity) {
  const data = {
    checkoutId: +checkoutId,
    productId: +productId,
    quantity: +quantity
  };
  const response = await fetchWithToken(`${BASE_URL}/checkout/editProduct`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status !== 200) {
    const resJson = await response.json();
    throw new Error(JSON.stringify(resJson));
  }
  const resJson = await response.json();
  return resJson;
}

async function deleteProductFromCheckout(checkoutId, productId) {
  const data = {
    checkoutId: +checkoutId,
    productId: +productId,
  };
  const response = await fetchWithToken(`${BASE_URL}/checkout/deleteProduct`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status !== 200) {
    const resJson = await response.json();
    throw new Error(JSON.stringify(resJson));
  }
  const resJson = await response.json();
  return resJson;
}

async function addCheckout({userId, address, method, courier, status = 'PACKING'}) {
  const data = {
    userId: +userId,
    address,
    method,
    courier,
    status
  };

  const response = await fetchWithToken(`${BASE_URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status !== 201) {
    const resJson = await response.json();
    throw new Error(JSON.stringify(resJson));
  }
  const resJson = await response.json();
  return resJson;
}

export { getAllOrders, 
  getDetailOrder, 
  sendOrder, 
  addProductToCheckout, 
  deleteProductFromCheckout,
  editProductInCheckout,
  addCheckout };
