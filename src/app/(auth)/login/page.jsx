/* eslint-disable react/no-unescaped-entities */

import { headers } from 'next/headers';

import Login from './login';

const LoginPage = () => {
  const headerList = headers();
  const test = headerList.get('test');
  return (
    <Login accessToken={test}/>
  );
};

export default LoginPage;
