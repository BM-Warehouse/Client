import jwt from 'jsonwebtoken';

function decodeToken() {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  const user = jwt.decode(token);

  return user;
}

export { decodeToken };
