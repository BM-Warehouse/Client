'use client';

import { useEffect } from 'react';

import ContainerCheckoutUser from '@/components/parts/ContainerCheckoutUser';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import useCheckoutStore from '@/store/checkoutStore';

function CheckoutHistoryUser() {
  const { userCheckouts, asyncGetCheckoutsUser } = useCheckoutStore();

  useEffect(() => {
    asyncGetCheckoutsUser();
  }, [asyncGetCheckoutsUser]);
  return (
    <section className="checkout-history-page relative h-screen bg-bgColor font-poppins ">
      <Navbar />
      <Sidebar />
      {/* <ToggleTheme />  */}
      <div className="title-page flex justify-center pt-24 mb-10">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Checkout History</h1>
      </div>

      <ContainerCheckoutUser userCheckouts={userCheckouts} />
    </section>
  );
}

export default CheckoutHistoryUser;
