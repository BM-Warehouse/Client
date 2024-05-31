/* eslint-disable react/no-unescaped-entities */

import { headers } from 'next/headers';

import Login from './login';

const LoginPage = () => {
  const headerList = headers();
  const accessToken = headerList.get('accessToken');
  return <Login accessToken={accessToken} />;
};

export default LoginPage;
