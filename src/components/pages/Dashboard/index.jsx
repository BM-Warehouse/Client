'use client';

// import CheckoutInfo from './components/CheckoutInfo';
import CheckoutInfoButton from './components/CheckoutInfo';
import AreaChart from './components/ProfitChart';
import QuantitiesChart from './components/QuantitiesChart';

function Dashboard() {
  return (
    <main className="dashboard-admin relative h-screen bg-bgColor font-poppins px-4 m:flex sm:justify-between sm:items-center mb-8">
      <div className="title-page flex justify-center pt-20 mb-8">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-4 p-4 md:ml-20">
        <QuantitiesChart />
        <AreaChart />
        <div className="flex justify-center">
          <CheckoutInfoButton />
        </div>
        <h1>test</h1>
      </div>
    </main>
  );
}

export default Dashboard;
