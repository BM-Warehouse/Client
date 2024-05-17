import BASE_URL from '@/lib/baseUrl';

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
    // console.log(BASE_URL);
    const { accessToken } = responseJson;

    return accessToken;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error login:', error.message);
    throw error;
  }
};

export { login };
