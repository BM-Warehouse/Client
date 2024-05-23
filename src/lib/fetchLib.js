import Cookies from 'js-cookie';

function getAccessToken() {
  return Cookies.get('accessToken');
}

function setAccessToken(token) {
  return Cookies.set('accessToken', token, { expires: 1 }); // Set cookie dengan masa berlaku 1 hari
}

const fetchWithToken = async (url, options = {}) =>
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`
    }
  });

function removeAccessToken() {
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export { getAccessToken, setAccessToken, fetchWithToken, removeAccessToken };
