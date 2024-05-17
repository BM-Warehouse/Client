import Image from 'next/image';

import SusuBayik from '@/assets/images/susu-bayik.png';

function ControlProductForm() {
  return (
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
  );
}

export default ControlProductForm;
