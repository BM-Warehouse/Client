/* eslint-disable camelcase */

'use client';

import { useState, useEffect } from 'react';

import toast from 'react-hot-toast';
import { IoFilterSharp } from 'react-icons/io5';

import ContainerCategory from '@/components/parts/ContainerCategory';
import Pagination from '@/components/parts/Pagination';
import useAuthUserStore from '@/store/authUserStore';
import useCategoryStore from '@/store/categoryStore';
import useProductStore from '@/store/productStore';

function ListCategories() {
  const { role } = useAuthUserStore();

  const [name, setName] = useState('');
  const [orderBy, setOrderBy] = useState('id');
  const [orderType, setOrderType] = useState('asc');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { categoriesData, asyncGetAllCategory, asyncAddCategory, pagination } = useCategoryStore();
  const { productsData } = useProductStore();
  let tSearch = null;

  useEffect(() => {
    asyncGetAllCategory().then(() => {
      setLoading(false);
    });
  }, [asyncGetAllCategory]);

  if (!productsData) {
    return null;
  }

  const onPaginationClick = async (page) => {
    await asyncGetAllCategory('', page, 10, orderBy, orderType);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSearchChange = (e) => {
    clearTimeout(tSearch);
    tSearch = setTimeout(async () => {
      await asyncGetAllCategory(e.target.value);
    }, 1000);
  };

  const onCloseAddModal = () => {
    document.getElementById('modal_add_category').close();
    setName('');
    setDescription('');
  };

  const onCloseFilterModal = () => {
    document.getElementById('modal_filter_category').close();
  };

  const handleApplyFilter = async (e) => {
    e.preventDefault();
    console.log(orderBy, orderType);
    await asyncGetAllCategory('', 1, 10, orderBy, orderType);
    onCloseFilterModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      // eslint-disable-next-line no-alert
      toast('Please select a file to upload.');
      return;
    }

    const formImage = new FormData();
    formImage.append('file', file);
    formImage.append('upload_preset', 'rwheysjo');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/denyah3ls/image/upload', {
        method: 'POST',
        body: formImage
      });

      // secureUrl ganti dulu jadi secure_url
      const { secure_url } = await response.json();

      const imageUrl = secure_url;

      const newCategory = await asyncAddCategory({ name, description, imageUrl });
      if (newCategory) {
        toast.success('Category added successfully!');
        setName('');
        setDescription('');
        document.getElementById('modal_add_category').close();
        await asyncGetAllCategory();
      }
    } catch (error) {
      console.log(`category added failed: ${error}`);
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-bars loading-lg text-tertiary"> </span>;
      </div>
    );

  if (!role) {
    return null;
  }
  return (
    <main className="category-page bg-bgColor relative h-screen font-poppins">
      <div className="category-title flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Categories</h1>
      </div>
      <div className="mt-20 flex flex-col-reverse justify-between px-5 md:ml-20 md:flex-row">
        <div className="btn-add-product">
          {role === 'admin' ? (
            <>
              <button
                className="btn bg-secondary text-white"
                onClick={() => document.getElementById('modal_add_category').showModal()}
              >
                Add Category
              </button>
              <dialog id="modal_add_category" className="modal">
                <div className="modal-box bg-primary ">
                  <h3 className="text-lg font-bold text-secondary">Add New Category</h3>
                  <div className="form-control">
                    <label htmlFor="name" className="label text-secondary">
                      Category name:
                    </label>
                    <input
                      className="input input-bordered"
                      type="text"
                      placeholder="Enter new name..."
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      name="name"
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="" className="label text-secondary">
                      Description:
                    </label>
                    <input
                      className="input input-bordered"
                      type="text"
                      placeholder="Enter description..."
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      name="description"
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="file-input file-input-bordered file-input-sm mt-5 w-full max-w-xs text-secondary file:border-secondary file:bg-secondary file:text-white"
                    />
                  </div>
                  <div className="container-btn-action flex items-center justify-between">
                    <div className="container-btn-submit mt-7">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn text-white bg-secondary"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="modal-action">
                      <button
                        type="button"
                        className="btn bg-secondary text-white"
                        onClick={onCloseAddModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </dialog>
            </>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="button-categories flex items-center">
          <label className="input flex h-8 items-center gap-2 border-tertiary">
            <input
              type="text"
              onChange={(e) => handleSearchChange(e)}
              className="grow text-sm text-secondary placeholder:text-secondary"
              placeholder="Search category..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 text-tertiary opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="btn-filter ml-5 cursor-pointer rounded-lg p-1 hover:bg-secondary">
            <button onClick={() => document.getElementById('modal_filter_category').showModal()}>
              <IoFilterSharp className="text-3xl text-secondary hover:text-white" />
            </button>
          </div>
          <dialog id="modal_filter_category" className="modal">
            <div className="modal-box bg-primary">
              <h3 className="font-bold text-lg text-tertiary">Filter Category</h3>
              <div className="form-contro my-5">
                <label htmlFor="orderBy">Order by:</label>
                <select
                  name="orderBy"
                  onChange={(e) => setOrderBy(e.target.value)}
                  className="border-2 w-full rounded-md h-10"
                >
                  <option value="id">Id</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="orderType">Order type:</label>
                <select
                  name="orederType"
                  onChange={(e) => setOrderType(e.target.value)}
                  className="border-2 w-full rounded-md h-10"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div className="container-btn-action flex items-center justify-between">
                <div className="container-btn-submit mt-7">
                  <button
                    type="submit"
                    onClick={handleApplyFilter}
                    className="btn text-white bg-secondary"
                  >
                    Apply
                  </button>
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn bg-secondary text-white"
                    onClick={onCloseFilterModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* <div className="container-products mt-24 grid grid-cols-2 gap-4 p-4 md:ml-20 md:grid-cols-3 xl:grid-cols-5"> */}
      {/* <div className="container-products w-full">
      </div> */}
      <div className="detail-category-page-content flex w-full justify-center">
        <ContainerCategory categoriesData={categoriesData} />
      </div>
      {/* </div> */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onClick={onPaginationClick}
      />
    </main>
  );
}

export default ListCategories;
