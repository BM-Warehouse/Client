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

async function getAllWarehouses() {
  const response = await fetchWithToken(`${BASE_URL}/warehouses`);
  return response;
}

export { getAllOrders, getDetailOrder, getAllWarehouses };
