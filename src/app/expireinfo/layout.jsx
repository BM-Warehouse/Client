'use client';

import ToggleTheme from '@/components/elements/ToggleTheme';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

const DashboardPageLayout = ({ children }) => (
  <div>
    <Sidebar />
    <Navbar />
    <ToggleTheme />
    <div>{children}</div>
  </div>
);

export default DashboardPageLayout;
