'use client';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

const OrdersPageLayout = ({ children }) => (
  <div>
    <Sidebar />
    <Navbar />
    <div>{children}</div>
  </div>
);

export default OrdersPageLayout;
