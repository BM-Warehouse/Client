/* eslint-disable no-alert */

'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import Loading from '@/components/parts/Loading';
import ModalTransfer from '@/components/parts/ModalTransfer';
import Navbar from '@/components/parts/Navbar';
import OrderSummary from '@/components/parts/OrderSummary';
import ProductPurchase from '@/components/parts/ProductPurchase';
import Sidebar from '@/components/parts/Sidebar';
import { addCartToCheckout } from '@/fetching/checkout';
import useInput from '@/hooks/useInput';
import formatRupiah from '@/lib/formatRupiah';
import useCartStore from '@/store/cartStore';
import useCheckoutStore from '@/store/checkoutStore';

function CheckoutUser() {
  const { cart, asyncShowCart, asyncResetCartToDefault } = useCartStore();
  const { couriers, asyncGetCouriers } = useCheckoutStore();
  const [shippingCost, setShippingCost] = useState(0);
  const [address, onAddressChange] = useInput('');
  const [selectedShippingMethod, onShippingMethodChange] = useInput('');
  const [selectedCourier, setSelectedCourier] = useState('');
  const [newCheckout, setNewCheckout] = useState('');

  const router = useRouter();

  useEffect(() => {
    asyncShowCart();
    asyncGetCouriers();
  }, [asyncShowCart, asyncGetCouriers]);

  const handleCourierChange = (e) => {
    const selectedCourierId = e.target.value;
    setSelectedCourier(selectedCourierId);

    const selectedCourierData = couriers.find((courier) => courier.id === +selectedCourierId);
    if (selectedCourierData) {
      setShippingCost(selectedCourierData.price);
    }
  };

  const handlePlaceOrder = async () => {
    if (!address || !selectedShippingMethod || !selectedCourier) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const newCheckout = await addCartToCheckout(
        +cart.id,
        +selectedCourier,
        address,
        selectedShippingMethod
      );
      toast.success('Products checked out successfully');
      setNewCheckout(newCheckout);
      // open modal
      document.getElementById('modal-confirmation-transfer-id').showModal();
    } catch (error) {
      toast.error(`Checkout failed: ${error.message}`);
    }
  };

  const handleResetCart = async () => {
    router.push(`/checkout-history/${newCheckout.id}`);
    await asyncResetCartToDefault();
  };

  if (!cart || !couriers) {
    return <Loading />;
  }
  return (
    <section className="checkout-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Checkout</h1>
      </div>
      <div className="container-checkout-page mx-2 mt-10 flex  min-h-screen flex-col md:ml-20 md:mr-1 md:mt-20 md:flex-row">
        <div className="checkout-content-left w-full p-4 text-tertiary  md:w-2/3">
          <div className="purchase-summary">
            <h5 className="text-md w-full border-b border-tertiary pb-3 text-lg font-bold">
              Purchase Summary
            </h5>
            <div className="container-products-purchase">
              {cart.ProductCart.map((prod) => (
                <ProductPurchase key={prod.procudtId} product={prod} />
              ))}
            </div>
          </div>
          <div className="purhcase-address flex w-full flex-col border-b border-tertiary py-5">
            <label className="text-lg font-bold">Shopping Address</label>
            <input
              type="text"
              placeholder="Street, Apt/Suite, City, State, ZIP Code"
              className="input mt-3 w-full border border-tertiary bg-bgColor text-sm"
              value={address}
              onChange={onAddressChange}
            />
          </div>

          <div className="select-shipping-method flex w-full flex-col  border-b  border-tertiary py-5">
            <label className="text-lg font-bold">Shipping Method</label>
            <select
              className="select mt-3 w-full border border-tertiary bg-bgColor"
              defaultValue=""
              value={selectedShippingMethod}
              onChange={onShippingMethodChange}
              required
            >
              <option value="">Choose shipping method</option>
              <option value="ONLINE">ONLINE</option>
            </select>
          </div>
          <div className="select-courier flex w-full  flex-col border-b  border-tertiary py-5">
            <label className="text-lg font-bold">Courier</label>
            <select
              className="select mt-3 w-full border  border-tertiary bg-bgColor"
              defaultValue=""
              value={selectedCourier}
              onChange={handleCourierChange}
            >
              <option value="">Choose courier service</option>
              {couriers.map((cou) => (
                <option value={cou.id} key={cou.id}>
                  {`${cou.name} | ${formatRupiah(cou.price)}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <OrderSummary cart={cart} shippingCost={shippingCost} handlePlaceOrder={handlePlaceOrder} />
        <ModalTransfer
          id="modal-confirmation-transfer-id"
          totalPrice={formatRupiah(newCheckout.totalPrice)}
          handleResetCart={handleResetCart}
        />
      </div>
    </section>
  );
}

export default CheckoutUser;
