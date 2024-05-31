/* eslint-disable camelcase */

'use client';

import { useState, useEffect } from 'react';

import { IoFilterSharp } from 'react-icons/io5';

import ContainerCategory from '@/components/parts/ContainerCategory';
// import Loading from '@/components/parts/Loading';
import Pagination from '@/components/parts/Pagination';
import useAuthUserStore from '@/store/authUserStore';
import useCategoryStore from '@/store/categoryStore';
import useProductStore from '@/store/productStore';

import { ModalAddCategory, openModalAddCategory } from './ModalAddCategory';

function ListCategories() {
  const { role } = useAuthUserStore();

  const [orderBy, setOrderBy] = useState('id');
  const [orderType, setOrderType] = useState('asc');
  const [isLoading, setLoading] = useState(true);
  const { categoriesData, asyncGetAllCategory, pagination } = useCategoryStore();
  const { productsData } = useProductStore();
  let tSearch = null;

  useEffect(() => {
    asyncGetAllCategory().then(() => {
      setLoading(false);
      // return <Loading />;
    });
  }, [asyncGetAllCategory]);

  if (!productsData) {
    return null;
  }

  const onPaginationClick = async (page) => {
    await asyncGetAllCategory('', page, 10, orderBy, orderType);
  };

  const handleSearchChange = (e) => {
    clearTimeout(tSearch);
    tSearch = setTimeout(async () => {
      await asyncGetAllCategory(e.target.value);
    }, 1000);
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

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-bars loading-lg text-tertiary"> </span>
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
              <button className="btn bg-secondary text-white" onClick={openModalAddCategory}>
                Add Category
              </button>
              <ModalAddCategory />
            </>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="button-categories flex justify-between items-center">
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
