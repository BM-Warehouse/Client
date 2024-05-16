'use client';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

function Dashboard() {
  return (
    <main className="dashboard-admin bg-bgg relative h-screen font-poppins">
      <Navbar />
      <Sidebar />
      <div className="admin-title flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Dashboard</h1>
      </div>
    </main>
  );
}

export default Dashboard;
