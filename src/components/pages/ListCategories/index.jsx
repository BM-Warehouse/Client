'use client';

import { HiPlus } from 'react-icons/hi';
import { IoFilterSharp } from 'react-icons/io5';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import ContainerCategory from '@/components/parts/containerCategory';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
// import useAuthUserStore from '@/store/authUserStore';

function ListCategories() {
  // const { role, authUser } = useAuthUserStore((state) => ({
  //   role: state.role,
  //   authUser: state.authUser
  // }));

  // console.log(authUser);

  const role = 'user';

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
            <button className="mt-5 min-w-28 rounded-md bg-tertiary px-3 py-2 text-primary hover:bg-secondary md:mt-0">
              <span className="flex items-center justify-center">
                <HiPlus className="mr-1" />
                Add Category
              </span>
            </button>
          ) : (
            <div> </div>
          )}
        </div>
        <div className="button-categories flex items-center">
          <label className="input input-bordered  flex h-8 items-center gap-2 border-tertiary">
            <input
              type="text"
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
            <IoFilterSharp className="text-3xl text-secondary hover:text-white" />
          </div>
        </div>
      </div>
      {/* <div className="container-products mt-24 grid grid-cols-2 gap-4 p-4 md:ml-20 md:grid-cols-3 xl:grid-cols-5"> */}
      <ContainerCategory />
      {/* </div> */}
      <div className="container-pagination flex items-center justify-center pb-10 ">
        <div className="button-pagination">
          <MdKeyboardArrowLeft className="text-2xl" />
        </div>
        <div className="join">
          <button className="btn join-item">1</button>
          <button className="btn join-item">2</button>
          <button className="btn join-item">3</button>
          <button className="btn join-item">4</button>
        </div>
        <div className="button-pagination">
          <MdKeyboardArrowRight className="text-2xl" />
        </div>
      </div>
    </main>
  );
}

export default ListCategories;
