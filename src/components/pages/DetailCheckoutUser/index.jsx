/* eslint-disable no-alert */

'use client';

import { useEffect } from 'react';

// import toast from 'react-hot-toast';
import toast from 'react-hot-toast';
import { FaWhatsapp } from 'react-icons/fa';

import ModalConfirmation from '@/components/parts/ModalConfirmation';
import Navbar from '@/components/parts/Navbar';
// import OrderSummary from '@/components/parts/OrderSummary';
import ProductPurchase from '@/components/parts/ProductPurchase';
import Sidebar from '@/components/parts/Sidebar';
import formatPhoneNumber from '@/lib/formatPhoneNumber';
import formatRupiah from '@/lib/formatRupiah';
import useAuthUserStore from '@/store/authUserStore';
import useCheckoutStore from '@/store/checkoutStore';

function DetailHistoryCheckout({ params }) {
  // const { cart, asyncShowCart, asyncResetCartToDefault } = useCartStore();
  const { detailCheckoutUser, asyncGetDetailCheckoutUser, asyncSetFeedback } = useCheckoutStore();
  const { authUser } = useAuthUserStore();

  console.log(authUser);

  const id = +params.checkoutId;

  useEffect(() => {
    asyncGetDetailCheckoutUser(id);
  }, [asyncGetDetailCheckoutUser, id]);

  if (!detailCheckoutUser) {
    return null;
  }

  let additionalCost = 0;
  switch (detailCheckoutUser.courier) {
    case 'JNE':
      additionalCost = 54000;
      break;
    case 'JNT':
      additionalCost = 63000;
      break;
    case 'SiCepat':
      additionalCost = 33000;
      break;
    default:
      additionalCost = 0;
  }

  const fixTotalPrice = +detailCheckoutUser.totalPrice + additionalCost;

  let messageOrder = '';
  switch (detailCheckoutUser.status) {
    case 'WAIT FOR PAYMENT':
      messageOrder = 'For the next step, please make your payment and confirm through WhatsApp.';
      break;
    case 'PACKING':
      messageOrder = 'Thank you for your payment. Your order is being packed.';
      break;
    case 'SENT':
      messageOrder = 'Your order is in the shipping process. Please confirm once it has arrived.';
      break;
    case 'COMPLAIN':
      messageOrder =
        'To proceed with a complaint/return, please contact the following WhatsApp number.';
      break;
    case 'DONE':
      messageOrder = 'Thank you for your trust in us. We look forward to your next order.';
      break;
    default:
      messageOrder = 'Thank you for your order';
  }

  const handleDone = async () => {
    try {
      const newStatus = 'DONE';
      await asyncSetFeedback(detailCheckoutUser.id, newStatus);
      toast.success('Order Confirmed successfully!');
      await asyncGetDetailCheckoutUser(id);
    } catch (error) {
      toast.error('Failed confirm order.');
      console.error('Error confirm order:', error.message);
    }
  };

  const handleComplain = async () => {
    try {
      const newStatus = 'COMPLAIN';
      await asyncSetFeedback(detailCheckoutUser.id, newStatus);
      toast.success('Order Confirmed successfully!');
      await asyncGetDetailCheckoutUser(id);
    } catch (error) {
      toast.error('Failed confirm order.');
      console.error('Error confirm order:', error.message);
    }
  };

  return (
    <section className="checkout-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Checkout Details</h1>
      </div>
      <div className="container-checkout-page mx-2 mt-10 flex  min-h-screen flex-col md:ml-20 md:mr-1 md:mt-20 md:flex-row">
        <div className="checkout-content-left w-full px-4 text-tertiary  md:w-1/2">
          <div className="purhcase-address flex w-full flex-col border-b border-tertiary py-5">
            <label className="text-md w-full border-y border-tertiary py-3 text-lg font-bold">
              Shopping Address
            </label>
            <div className="address-info mt-3 ">
              <p className="text-base mb-1">{authUser.fullName}</p>
              <p className="text-base mb-1">{formatPhoneNumber(authUser.phone)}</p>
              <p className="text-base mb-1">{detailCheckoutUser.address}</p>
            </div>
          </div>
          <div className="purhcase-address flex w-full flex-col border-b border-tertiary py-3">
            <label className="text-md w-full border-b border-tertiary pb-3 text-lg font-bold">
              Order Summary
            </label>
            <div className="subtotal mt-3 flex justify-between">
              <p className="text-base">Subtotal</p>
              <p className="">{formatRupiah(detailCheckoutUser.totalPrice)}</p>
            </div>
            <div className="subtotal mt-3 flex justify-between">
              <p className="text-base">Additional Cost</p>
              <p className="">{formatRupiah(additionalCost)}</p>
            </div>
            <div className="subtotal mt-3 flex justify-between">
              <p className="text-base font-bold">Total Price</p>
              <p className="font-bold">{formatRupiah(fixTotalPrice)}</p>
            </div>
          </div>
          <div className="purchase-summary mt-4">
            <h5 className="text-md w-full border-b border-tertiary pb-3 text-lg font-bold">
              Purchase Summary
            </h5>
            <div className="container-products-purchase">
              {detailCheckoutUser.productCheckout.map((prod) => (
                <ProductPurchase key={prod.procudtId} product={prod} />
              ))}
            </div>
          </div>
        </div>

        <div className="ckeckout-content-right mt-5 w-full border border-tertiary p-5 text-tertiary md:ml-8 md:mr-4 md:w-2/4">
          <div className="title-order-summary w-full border-b border-tertiary pb-3 text-lg font-bold flex justify-between">
            <h5 className="">Order Status</h5>
            <h5 className="bg-tertiary py-1 px-2 rounded-md text-bgColor ">
              {detailCheckoutUser.status}
            </h5>
          </div>
          <div className="details-order py-5">
            <div className="checkout-id mb-3 flex justify-between">
              <p className="text-base">Checkout ID</p>
              <p className="text-base">{detailCheckoutUser.id}</p>
            </div>
            <div className="checkout-method mb-3 flex justify-between">
              <p className="text-base">Method</p>
              <p className="text-base">{detailCheckoutUser.method}</p>
            </div>
            <div className="checkout-courier mb-3 flex justify-between">
              <p className="text-base">Courier</p>
              <p className="text-base">{detailCheckoutUser.courier}</p>
            </div>
            <div className="checkout-courier mb-3 flex justify-between">
              <p className="text-base">Tracking Number</p>
              <p className="text-base">{detailCheckoutUser.resi ? detailCheckoutUser.resi : '-'}</p>
            </div>
            <div className="shipping mb-3 mt-7  flex justify-center">
              <q className="font-semibold text-center">{messageOrder}</q>
            </div>
            {/* <div className="total-pay flex justify-between">
              <p className="font-bold">Total to Pay</p>
              <p className="font-bold">{formatRupiah(detailCheckoutUser.totalPrice)}</p>
            </div> */}
          </div>
          {detailCheckoutUser.status === 'WAIT FOR PAYMENT' && (
            <div className="details-order p-5 bg-primary flex items-center justify-center flex-col mb-5 text-justify rounded-xl">
              <div className="main-info ">
                Please make the payment by transferring to <b>BCA</b> account number{' '}
                <b>0500673610</b> in the name of <b>KIT HARINGTON </b>for{' '}
                <span className="font-bold">{formatRupiah(fixTotalPrice)}</span> and send the
                transfer proof to WhatsApp 0892602833123.
              </div>
              <div className="mt-3">
                <a
                  target="_blank"
                  href="whatsapp://send?text=Hello&phone=+6285211940022"
                  className=" bg-tertiary text-bgColor px-3 py-1 flex justify-center items-center gap-2  hover:bg-secondary rounded-xl"
                >
                  <FaWhatsapp /> Whatsapp
                </a>
              </div>
            </div>
          )}

          {detailCheckoutUser.status === 'COMPLAIN' && (
            <div className="details-order p-5 bg-primary flex items-center justify-center flex-col mb-5 text-justify rounded-xl">
              <div className="main-info ">
                Please file a complaint by sending a video of the package opening and the reason for
                the complaint to WhatsApp 0892602833123.
              </div>
              <div className="mt-3">
                <a
                  target="_blank"
                  href="whatsapp://send?text=Hello&phone=+6285211940022"
                  className=" bg-tertiary text-bgColor px-3 py-1 flex justify-center items-center gap-2  hover:bg-secondary rounded-xl"
                >
                  <FaWhatsapp /> Whatsapp
                </a>
              </div>
            </div>
          )}

          {detailCheckoutUser.status === 'SENT' && (
            <div className="btn-order mb-10 w-full flex justify-evenly">
              <button
                onClick={() =>
                  document
                    .getElementById(`modal-confirmation-done-id-${detailCheckoutUser.id}`)
                    .showModal()
                }
                type="button"
                // onClick={handlePlaceOrder}
                className="md:w-48 w-28 bg-tertiary px-4 md:px-8 py-2 md:py-4 font-bold text-white hover:bg-secondary"
              >
                DONE
              </button>
              <ModalConfirmation
                action={handleDone}
                message="Are you sure you want to finish this order?"
                id={`modal-confirmation-done-id-${detailCheckoutUser.id}`}
              />
              <button
                onClick={() =>
                  document
                    .getElementById(`modal-confirmation-complain-id-${detailCheckoutUser.id}`)
                    .showModal()
                }
                type="button"
                // onClick={handlePlaceOrder}
                className=" md:w-48 w-28  bg-ligtDanger px-4 md:px-8 py-2 md:py-4 font-bold text-white hover:bg-danger"
              >
                COMPLAIN
              </button>
              <ModalConfirmation
                action={handleComplain}
                message="Are you sure you want to complain this order?"
                id={`modal-confirmation-complain-id-${detailCheckoutUser.id}`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailHistoryCheckout;
