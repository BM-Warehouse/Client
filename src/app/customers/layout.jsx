'use client';

import Container from '@/components/container';
import Navbar from '@/components/navbar-admin';

const CustomersPageLayout = ({ children }) => (
  <div>
    <Navbar />
    <Container>
      <div>{children}</div>
    </Container>
  </div>
);

export default CustomersPageLayout;
