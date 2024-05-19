'use client';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

import { DoughnutChart } from './components/DoughnutChart';
import QuantitiesChart from './components/QuantitiesChart';

function Dashboard() {
  return (
    <main className="dashboard-admin bg-bgg relative h-screen font-poppins">
      <Navbar />
      <Sidebar />
      <div className="admin-title flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Dashboard</h1>
      </div>
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex justify-center">
            <QuantitiesChart />
          </div>
          <div className="flex justify-center">
            <div className="h-80 w-80 md:h-80 md:w-80">
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
