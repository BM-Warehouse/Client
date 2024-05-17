import Image from 'next/image';

import AdminWarehouse from '@/assets/images/adminwarehouse.jpeg';
import SusuBayik from '@/assets/images/susu-bayik.png';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

function AddProduct() {
  return (
    <section className="add-product-page relative min-h-screen bg-bgColor pb-20 font-poppins md:pb-12">
      <Navbar />
      <Sidebar />
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Add Product</h1>
      </div>
      <div className="body-page mt-10 flex px-2 md:ml-40">
        <form action="" className="w-full bg-white xl:w-2/4 ">
          <label className="form-control  w-full max-w-lg">
            <div className="label">
              <span className="label-text text-txt">Product Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter product name"
              className="input w-full max-w-lg   border border-tertiary bg-bgColor"
              name="name"
              required
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text text-txt">Price</span>
            </div>
            <input
              type="text"
              placeholder="Enter product price"
              className="input w-full max-w-lg   border border-tertiary bg-bgColor"
              name="price"
              required
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text text-txt">Stock</span>
            </div>
            <input
              type="text"
              placeholder="Enter product stock"
              className="input  w-full max-w-lg   border border-tertiary bg-bgColor"
              name="stock"
              required
            />
          </label>
          <label className="form-control  w-full max-w-lg">
            <div className="label">
              <span className="label-text text-txt">Warehouse</span>
            </div>
            <select className="select  w-full max-w-lg  border border-tertiary bg-bgColor">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </label>
          <label className="form-control  w-full max-w-lg">
            <div className="label">
              <span className="label-text text-txt">Description</span>
            </div>

            <textarea
              className="textarea w-full max-w-lg  border border-tertiary bg-bgColor"
              placeholder="Enter product description here ..."
              name="description"
              required
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text text-txt">Image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-accent w-full max-w-lg bg-bgColor"
              name="image"
              accept="image/*"
            />
          </label>
          <Image
            src={SusuBayik}
            alt="Selected Imagess"
            className="max-h-auto ml-3 mt-3 max-h-48 max-w-48"
          />
          <button
            type="button"
            className="btn mt-5 w-full max-w-lg rounded-sm  border-0 bg-tertiary text-xl text-bgColor hover:bg-secondary "
          >
            Add Book
          </button>
        </form>
        <div className="img-additional flex w-2/4 items-center justify-center bg-white  max-[900px]:hidden">
          <Image
            src={AdminWarehouse}
            alt="Admin Warehouse Image"
            className="max-h-screen w-auto rounded-[100px] saturate-200"
          />
        </div>
      </div>
    </section>
  );
}

export default AddProduct;
