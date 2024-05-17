'use client';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

import QuantitiesChart from './components/QuantitiesChart';

function Dashboard() {
  return (
    <main className="dashboard-admin bg-bgg relative h-screen font-poppins">
      <Navbar />
      <Sidebar />
      <div className="admin-title flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Dashboard</h1>
      </div>
      <QuantitiesChart />
    </main>
  );
}

export default Dashboard;
