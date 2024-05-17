import BASE_URL from '@/lib/baseUrl';

export const register = async ({
  email,
  username,
  password,
  fullName,
  phone,
  address,
  gender,
  birthdate,
  avatar,
  role
}) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username,
        password,
        fullName,
        phone,
        address,
        gender,
        birthdate,
        avatar,
        role
      })
    });

    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  } catch (error) {
    console.error('Error in register:', error.message);
    throw error;
  }
};

const login = async ({ username, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const responseJson = await response.json();
    console.log(BASE_URL);
    const { accessToken } = responseJson;

    return accessToken;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error login:', error.message);
    throw error;
  }
};

export { login };
