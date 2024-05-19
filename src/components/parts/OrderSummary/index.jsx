import formatRupiah from '@/lib/formatRupiah';

function OrderSummary({ cart, shippingCost, handlePlaceOrder }) {
  if (!cart) {
    return null;
  }
  return (
    <div className="ckeckout-content-right mt-5 w-full border border-tertiary p-5 text-tertiary md:ml-8 md:mr-4 md:w-1/3">
      <div className="title-order-summary">
        <h5 className="w-full border-b border-tertiary pb-3 text-lg font-bold">Order Summary</h5>
      </div>
      <div className="total-order py-5">
        <div className="subtotal mb-3 flex justify-between">
          <p className="text-base">Subtotal</p>
          <p className="font-bold">{formatRupiah(cart.totalPrice)}</p>
        </div>
        <div className="shipping mb-3 flex justify-between">
          <p>Shipping</p>
          <p className="font-bold">{formatRupiah(shippingCost)}</p>
        </div>
        <div className="total-pay flex justify-between">
          <p className="font-bold">Total to Pay</p>
          <p className="font-bold">{formatRupiah(cart.totalPrice + shippingCost)}</p>
        </div>
      </div>
      <div className="btn-order mb-10">
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="w-full bg-tertiary px-8 py-4 font-bold text-white hover:bg-secondary"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
