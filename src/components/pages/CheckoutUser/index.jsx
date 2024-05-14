import Navbar from '@/components/parts/Navbar';
import OrderSummary from '@/components/parts/OrderSummary';
import ProductPurchase from '@/components/parts/ProductPurchase';
import Sidebar from '@/components/parts/Sidebar';

function CheckoutUser() {
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
              <ProductPurchase />
              <ProductPurchase />
            </div>
          </div>
          <div className="purhcase-address flex w-full flex-col border-b border-tertiary py-5">
            <label className="text-lg font-bold">Shopping Address</label>
            <input
              type="text"
              placeholder="Street, Apt/Suite, City, State, ZIP Code"
              className="input mt-3 w-full border border-tertiary bg-bgColor text-sm"
            />
          </div>
          <div className="select-courier flex w-full flex-col  border-b  border-tertiary py-5">
            <label className="text-lg font-bold">Courier</label>
            <select
              className="select mt-3 w-full border border-tertiary bg-bgColor"
              defaultValue=""
            >
              <option value="">Choose courier service</option>
              <option value="Jalur Nugraha Ekakurir (JNE)">Jalur Nugraha Ekakurir (JNE)</option>
            </select>
          </div>
          <div className="select-shipping method flex w-full  flex-col border-b  border-tertiary py-5">
            <label className="text-lg font-bold">Shipping Method</label>
            <select
              className="select mt-3 w-full border  border-tertiary bg-bgColor"
              defaultValue=""
            >
              <option value="">Choose shipping method</option>
              <option value="OKE | Rp.54,000, 3-6 days">OKE | Rp.54,000, 3-6 days</option>
              <option value="REG | Rp.63,000, 2-3 days">REG | Rp.63,000, 2-3 days</option>
            </select>
          </div>
          <div className="select-shipping method flex w-full flex-col border-b border-tertiary py-5">
            <label className="text-lg font-bold">Transfer Method</label>
            <select
              className="select mt-3 w-full border border-tertiary bg-bgColor"
              defaultValue=""
            >
              <option value="">Choose transfer method</option>
              <option value="BSI Admin 722391312">BSI</option>
              <option value="BCA Admin 120992311">BCA</option>
              <option value="BNI Admin 909090909">BNI</option>
            </select>
          </div>
        </div>

        <OrderSummary />
      </div>
    </section>
  );
}

export default CheckoutUser;
