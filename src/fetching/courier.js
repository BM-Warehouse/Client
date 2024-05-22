import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

async function getAllCouriers(page = 1, limit = 10) {
  const url = `${BASE_URL}/couriers?${new URLSearchParams({
    page,
    limit
  })}`;
  
  const response = await fetchWithToken(url);
  if(response.status !== 200) throw Error("Fail to retrieve Courier Data");

  const responseJson = await response.json();
  return responseJson;
}

export {
    getAllCouriers
}