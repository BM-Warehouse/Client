import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

function AddProduct() {
  return (
    <section className="add-product-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Add Product</h1>
      </div>
      <div className="body-page ml-28 mt-10">
        <form action="" className="w-full bg-white xl:w-2/4">
          <label className="form-control w-full max-w">
            <div className="label">
              <span className="label-text text-txt">Product Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter product name"
              className="input input-bordered input-primary  w-full max-w-lg bg-bgColor"
              name="name"
              required
            />
          </label>
          <label className="form-control w-full max-w">
            <div className="label">
              <span className="label-text text-txt">Price</span>
            </div>
            <input
              type="text"
              placeholder="Enter product price"
              className="input input-bordered input-primary  w-full max-w-lg bg-bgColor"
              name="name"
              required
            />
          </label>
          <label className="form-control w-full max-w">
            <div className="label">
              <span className="label-text text-txt">Stock</span>
            </div>
            <input
              type="text"
              placeholder="Enter product stock"
              className="input input-bordered input-primary  w-full max-w-lg bg-bgColor"
              name="name"
              required
            />
          </label>
        </form>
      </div>
    </section>
  );
}

export default AddProduct;
