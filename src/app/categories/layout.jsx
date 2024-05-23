'use client';

import ContentContainer from '@/components/parts/ContentContainer';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

const Layout = ({ children }) => (
  <div>
    <Sidebar />
    <Navbar />
    <ContentContainer>
      <div>{children}</div>
    </ContentContainer>
  </div>
);

export default Layout;
