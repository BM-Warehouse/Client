'use client';

import Navbar from '@/components/navbar-admin';
import Container from '@/components/parts/container';
import Sidebar from '@/components/parts/Sidebar';

const WarehousesPageLayout = ({ children }) => (
  <div>
    <Navbar />
    <Sidebar />
    <Container>
      <div>{children}</div>
    </Container>
  </div>
);

export default WarehousesPageLayout;
