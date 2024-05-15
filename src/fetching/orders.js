import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

async function getAllOrders() {
  const response = await fetchWithToken(`${BASE_URL}/checkout`);
  return response;
}

export { getAllOrders };
