'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { IoFilterSharp } from 'react-icons/io5';

import ContainerCategory from '@/components/parts/containerCategory/index';
import Navbar from '@/components/parts/Navbar';
import Pagination from '@/components/parts/Pagination';
import Sidebar from '@/components/parts/Sidebar';
import useInput from '@/hooks/useInput';
import useAuthUserStore from '@/store/authUserStore';
import useCategryStore from '@/store/categoryStore';

function ListCategories() {
  const router = useRouter();

  const { role } = useAuthUserStore();

  const [name, onNameChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');
  const [file, setFile] = useState(null);
  const [contains, setContains] = useState('');
  const [searchContain, onSearchContainChange] = useInput('');

  const { categoriesData, asyncGetAll, asyncAddCategory, pagination } = useCategryStore();

  useEffect(() => {
    asyncGetAll();
  }, [asyncGetAll]);

  const onPaginationClick = async (page) => {
    await asyncGetAll(contains, page);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setContains(searchContain);
    asyncGetAll(contains);
    router.refresh();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      // eslint-disable-next-line no-alert
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rwheysjo');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/denyah3ls/image/upload', {
        method: 'POST',
        body: formData
      });

      // secureUrl ganti dulu jadi secure_url
      const { secureUrl } = await response.json();

      const imageUrl = secureUrl;

      await asyncAddCategory({ name, description, imageUrl });
      alert('Category added successfully!');
    } catch (error) {
      console.log(`category added failed: ${error}`);
    }
  };

  if (!role) {
    return null;
  }
  return (
    <main className="category-page bg-bgg relative h-screen font-poppins">
      <Navbar />
      <Sidebar />
      <div className="category-title flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Categories</h1>
      </div>
      <div className="mt-20 flex flex-col-reverse justify-between px-5 md:ml-20 md:flex-row">
        <div className="btn-add-product">
          {role === 'admin' ? (
            <>
              <button
                className="btn bg-secondary text-white"
                onClick={() => document.getElementById('my_modal_1').showModal()}
              >
                Add Category
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-primary">
                  <h3 className="text-lg font-bold text-secondary">Add New Category</h3>
                  <div className="input-container">
                    <label htmlFor="" className="text-secondary">
                      Category name:
                      <input
                        type="text"
                        placeholder="Enter new name..."
                        onChange={onNameChange}
                        value={name}
                        name="name"
                        className="input ml-3 mt-5 h-8 w-full max-w-xs border-secondary placeholder:text-secondary"
                      />
                    </label>
                    <label htmlFor="" className="text-secondary">
                      Description:
                      <input
                        type="text"
                        placeholder="Enter description..."
                        onChange={onDescriptionChange}
                        value={description}
                        name="description"
                        className="input ml-3 mt-5 h-8 w-full max-w-xs border-secondary placeholder:text-secondary"
                      />
                    </label>
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
                        className="btn bg-secondary text-white"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="modal-action">
                      <form method="dialog" className="flex flex-row-reverse justify-between">
                        <button className="btn bg-secondary text-white">Close</button>
                      </form>
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
          <label
            className="input flex h-8 items-center gap-2 border-tertiary"
            // onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              value={searchContain}
              onChange={onSearchContainChange}
              className="grow text-sm text-secondary placeholder:text-secondary"
              placeholder="Search category..."
            />
            <button type="button" onClick={handleSearchSubmit}>
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
            </button>
          </label>
          <div className="btn-filter ml-5 cursor-pointer rounded-lg p-1 hover:bg-secondary">
            <IoFilterSharp className="text-3xl text-secondary hover:text-white" />
          </div>
        </div>
      </div>
      {/* <div className="container-products mt-24 grid grid-cols-2 gap-4 p-4 md:ml-20 md:grid-cols-3 xl:grid-cols-5"> */}
      <ContainerCategory categoriesData={categoriesData} />
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
