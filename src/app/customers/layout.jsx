'use client';

import Navbar from '@/components/navbar-admin';
import Container from '@/components/parts/container';

const CustomersPageLayout = ({ children }) => (
  <div>
    <Navbar />
    <Container>
      <div>{children}</div>
    </Container>
  </div>
);

export default CustomersPageLayout;
