'use client';

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
  const { pagination, asyncGetAll } = useUsersStore();

  const onPaginationClick = async (page) => {
    await asyncGetAll(page);
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
          <label className="input  border-tertiary bg-bgColor flex h-8 items-center gap-2 ">
            <input
              type="text"
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
          <div className="btn-filter ml-5 cursor-pointer rounded-lg p-1  hover:bg-secondary">
            <IoFilterSharp className="text-3xl text-secondary hover:text-white " />
          </div>
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
