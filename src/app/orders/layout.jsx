'use client';

import Container from '@/components/container';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

const OrdersPageLayout = ({ children }) => (
  <div>
    <Navbar />
    <Sidebar />
    <Container>
      <div>{children}</div>
    </Container>
  </div>
);

export default OrdersPageLayout;
