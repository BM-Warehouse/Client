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
import useInput from '@/hooks/useInput';
import formatRupiah from '@/lib/formatRupiah';
import useCartStore from '@/store/cartStore';
import useCheckoutStore from '@/store/checkoutStore';

function CheckoutUser() {
  const { cart, asyncShowCart, asyncResetCartToDefault } = useCartStore();
  const { asyncAddCartToCheckout } = useCheckoutStore();
  const [shippingCost, setShippingCost] = useState(0);
  const [address, onAddressChange] = useInput('');
  const [selectedShippingMethod, onShippingMethodChange] = useInput('');
  const [selectedCourier, setSelectedCourier] = useState('');

  const router = useRouter();

  useEffect(() => {
    asyncShowCart();
  }, [asyncShowCart]);

  const handleCourierChange = (e) => {
    setSelectedCourier(e.target.value);
    if (e.target.value === 'JNE') {
      setShippingCost(54000);
    } else if (e.target.value === 'JNT') {
      setShippingCost(63000);
    } else if (e.target.value === 'SiCepat') {
      setShippingCost(33000);
    }
  };

  const handlePlaceOrder = async () => {
    if (!address || !selectedShippingMethod || !selectedCourier) {
      // alert('Please fill in all required fields');
      toast.error('Please fill in all required fields');
      return;
    }

    await asyncAddCartToCheckout(+cart.id, selectedCourier, address, selectedShippingMethod);
    toast.success('Products  checkouted successfully');

    document.getElementById(`modal-confirmation-transfer-id-${cart.id}`).showModal();
    // console.log(selectedCourier, address, selectedShippingMethod);

    // console.log(cart.id);
  };

  const handleResetCart = async () => {
    router.push('/checkout-history');
    await asyncResetCartToDefault();
  };

  if (!cart) {
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
              <option value="JNE">JNE | Rp.54,000, 3-6 days</option>
              <option value="JNT">JNT | Rp.63,000, 2-3 days</option>
              <option value="SiCepat">SiCepat | Rp.33,000, 4-7 days</option>
            </select>
          </div>
        </div>

        <OrderSummary cart={cart} shippingCost={shippingCost} handlePlaceOrder={handlePlaceOrder} />
        <ModalTransfer
          id={`modal-confirmation-transfer-id-${cart.id}`}
          totalPrice={formatRupiah(cart.totalPrice + shippingCost)}
          handleResetCart={handleResetCart}
        />
      </div>
    </section>
  );
}

export default CheckoutUser;
