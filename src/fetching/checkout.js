import BASE_URL from '@/lib/baseUrl';
import { fetchWithToken } from '@/lib/fetchLib';

const getCheckoutsUser = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/checkout/me`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { checkoutsUser }
    } = responseJson;
    return checkoutsUser;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const addCartToCheckout = async (cartId, courier, address, method) => {
  try {
    const requestBody = {
      cartId,
      courier,
      address,
      method
    };
    const response = await fetchWithToken(`${BASE_URL}/checkout/action`, {
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

const getDetailCheckoutUser = async (checkoutId) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/checkout/me/${checkoutId}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { checkoutDetail }
    } = responseJson;
    return checkoutDetail;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export { addCartToCheckout, getCheckoutsUser, getDetailCheckoutUser };
