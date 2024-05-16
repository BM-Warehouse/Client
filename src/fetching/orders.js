import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

async function getAllOrders() {
  const response = await fetchWithToken(`${BASE_URL}/checkout`);
  return response;
}
async function getDetailOrder(id) {
  const response = await fetchWithToken(`${BASE_URL}/checkout/${id}`);
  return response;
}

async function sendOrder(checkoutId, warehouseSelections) {
  const data = {
    checkoutId: +checkoutId,
    warehouseSelections
  }
  const response = await fetchWithToken(`${BASE_URL}/checkout/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if(response.status !== 200) {
    const resJson = await response.json();
    throw new Error(JSON.stringify(resJson));
  }
  const resJson = await response.json();
  return resJson;
}

export { getAllOrders, getDetailOrder, sendOrder };
