function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function setAccessToken(token) {
  return localStorage.setItem('accessToken', token);
}

const fetchWithToken = async (url, options = {}) =>
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`
    }
  });

export { getAccessToken, setAccessToken, fetchWithToken };
