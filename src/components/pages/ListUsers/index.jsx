'use client';

import { useState } from 'react';

import Link from 'next/link';
import { HiUserAdd } from 'react-icons/hi';
import { IoFilterSharp } from 'react-icons/io5';

import Loading from '@/components/parts/Loading';
import Navbar from '@/components/parts/Navbar';
import Pagination from '@/components/parts/Pagination';
import Sidebar from '@/components/parts/Sidebar';
import TableUsers from '@/components/parts/TableUsers';
import useAuthUserStore from '@/store/authUserStore';
import useUsersStore from '@/store/userStore';

function ListUsers() {
  const { role } = useAuthUserStore();
  const [orderBy, setOrderBy] = useState('id');
  const [orderType, setOrderType] = useState('asc');
  const { pagination, asyncGetAll } = useUsersStore();
  let tSearch = null;

  const onPaginationClick = async (page) => {
    await asyncGetAll('', page, 10, orderBy, orderType);
  };

  const handleApplyFilter = async (e) => {
    e.preventDefault();
    await asyncGetAll('', 1, 10, orderBy, orderType);
    document.getElementById('modal_filter_users').close();
  };

  const handleSearchChange = (e) => {
    clearTimeout(tSearch);
    tSearch = setTimeout(async () => {
      await asyncGetAll(e.target.value);
    }, 1000);
  };

  if (!role) {
    return <Loading />;
  }
  return (
    <main className="user-page bg-bgColor relative h-screen font-poppins ">
      <Navbar />
      <Sidebar />
      <div className="title-page flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Users Management</h1>
      </div>
      <div className="container-btn-users mt-20 flex flex-col-reverse justify-between px-5 md:ml-20 md:flex-row">
        <div className="btn-add-user">
          <Link href="users/createUser">
            <button className="mt-5 min-w-28 rounded-md bg-tertiary px-3 py-2 text-primary hover:bg-secondary md:mt-0">
              <span className="flex items-center justify-center">
                <HiUserAdd className="mr-1" />
                Add User
              </span>
            </button>
          </Link>
        </div>
        <div className="search-filter flex items-center justify-between">
          <label className="input border-tertiary bg-bgColor  flex h-8 items-center gap-2 ">
            <input
              type="text"
              onChange={(e) => handleSearchChange(e)}
              className="grow text-sm text-tertiary transition-none placeholder:text-secondary"
              placeholder="Search user..."
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
            <button onClick={() => document.getElementById('modal_filter_users').showModal()}>
              <IoFilterSharp className="text-3xl text-secondary hover:text-white" />
            </button>
          </div>
          <dialog id="modal_filter_users" className="modal">
            <div className="modal-box bg-primary">
              <h3 className="font-bold text-lg text-tertiary">Filter User</h3>
              <div className="form-contro my-5">
                <label htmlFor="orderBy">Order by:</label>
                <select
                  name="orderBy"
                  onChange={(e) => setOrderBy(e.target.value)}
                  className="border-2 w-full rounded-md h-10"
                >
                  <option value="id">Id</option>
                  <option value="email">Email</option>
                  <option value="fullName">Name</option>
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
                    onClick={() => document.getElementById('modal_filter_users').close()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <TableUsers />
      <Pagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onClick={onPaginationClick}
      />
    </main>
  );
}

export default ListUsers;
