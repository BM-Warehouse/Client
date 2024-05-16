'use client';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import useAuthUserStore from '@/store/authUserStore';

function Dashboard() {
  const { role } = useAuthUserStore();

  if (!role) {
    return null;
  }

  if (role === 'admin') {
    return (
      <main className="dashboard-admin bg-bgg relative h-screen font-poppins">
        <Navbar />
        <Sidebar />
        <div className="admin-title flex justify-center pt-24">
          <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Dashboard Admin</h1>
        </div>
      </main>
    );
  }

  if (role === 'user') {
    return (
      <main className="dashboard-user bg-bgg relative h-screen font-poppins">
        <Navbar />
        <Sidebar />
        <div className="user-title flex justify-center pt-24">
          <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Dashboard User</h1>
        </div>
      </main>
    );
  }

  return null;
}

export default Dashboard;
