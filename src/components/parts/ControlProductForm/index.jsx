/* eslint-disable camelcase */
/* eslint-disable no-alert */

'use client';

import { useEffect, useState } from 'react';

// import Image from 'next/image';

import useInput from '@/hooks/useInput';
import useCategryStore from '@/store/categoryStore';

function ControlProductForm({ product }) {
  const [name, onNameChange] = useInput(product ? product.name : '');
  const [price, onPriceChange] = useInput(product ? product.price : '');
  const [desc, onDescChange] = useInput(product ? product.desc : '');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { categoriesData, asyncGetAll } = useCategryStore();

  // console.log(categoriesData);

  useEffect(() => {
    asyncGetAll();
  }, [asyncGetAll]);

  if (!categoriesData) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit diklik');

    if (!selectedImage) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'rwheysjo');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/denyah3ls/image/upload', {
        method: 'POST',
        body: formData
      });

      // secureUrl ganti dulu jadi secure_url
      const { secure_url } = await response.json();

      const imageUrl = secure_url;

      console.log(name, price, desc, imageUrl);

      // await asyncAddCategory({ name, description, imageUrl });
    } catch (error) {
      console.log(`category added failed: ${error}`);
    }
  };

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
          defaultValue={product ? product.name : name}
          onChange={onNameChange}
        />
      </label>
      <label className="form-control w-full max-w-lg">
        <div className="label">
          <span className="label-text text-txt">Price</span>
        </div>
        <input
          type="text"
          placeholder="Enter product price"
          className="input w-full max-w-lg border border-tertiary bg-bgColor"
          name="price"
          required
          defaultValue={product ? product.price : price}
          onChange={onPriceChange}
        />
      </label>
      <label className="form-control  w-full max-w-lg">
        <div className="label">
          <span className="label-text text-txt">Category</span>
        </div>
        <select className="select  w-full max-w-lg  border border-tertiary bg-bgColor">
          <option disabled selected>
            Who shot first?
          </option>
          {console.log(categoriesData)}
          {categoriesData.map((ctg) => (
            <option key={ctg.id}>{ctg.name}</option>
          ))}
          {/* <option>Greedo</option> */}
        </select>
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
      <label className="form-control w-full max-w-lg">
        <div className="label">
          <span className="label-text text-txt">Stock</span>
        </div>
        <input
          type="text"
          placeholder="Enter product stock"
          className="input  w-full max-w-lg   border border-tertiary bg-bgColor"
          name="stock"
          // required
        />
      </label>
      <label className="form-control  w-full max-w-lg">
        <div className="label">
          <span className="label-text text-txt">Description</span>
        </div>

        <textarea
          className="textarea w-full max-w-lg  border border-tertiary bg-bgColor"
          placeholder="Enter product description here ..."
          name="description"
          defaultValue={product ? product.description : desc}
          onChange={onDescChange}
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
          onChange={handleFileChange}
        />
      </label>
      {/* <Image
        src={SusuBayik}
        alt="Selected Imagess"
        className="max-h-auto ml-3 mt-3 max-h-48 max-w-48"
      /> */}
      {previewImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewImage}
          alt="Selected Imagesss"
          className="max-h-auto ml-3 mt-3 max-h-48 max-w-48"
        />
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        className="btn mt-5 w-full max-w-lg rounded-sm  border-0 bg-tertiary text-xl text-bgColor hover:bg-secondary "
      >
        Add Book
      </button>
    </form>
  );
}

export default ControlProductForm;
