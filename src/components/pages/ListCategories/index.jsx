'use client';

import { IoFilterSharp } from 'react-icons/io5';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import ContainerCategory from '@/components/parts/containerCategory';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import useInput from '@/hooks/useInput';
import useAuthUserStore from '@/store/authUserStore';
import useCategryStore from '@/store/categoryStore';

function ListCategories() {
  const { role } = useAuthUserStore();

  const [name, onNameChange] = useInput('');
  const [description, onDescriptionChange] = useInput('');

  const { asyncAddCategory } = useCategryStore();

  const handleAdd = async () => {
    console.log(`kategori: ${name} \ndescription: ${description}`);
    try {
      await asyncAddCategory({ name, description });
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
                  <h3 className="font-bold text-lg text-secondary">Add New Category</h3>
                  <div className="input-container">
                    <label htmlFor="" className="text-secondary">
                      Category name:
                      <input
                        type="text"
                        placeholder="Enter new name..."
                        onChange={onNameChange}
                        value={name}
                        name="name"
                        className="input input-bordered w-full max-w-xs ml-3 h-8 mt-5 placeholder:text-secondary border-secondary"
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
                        className="input input-bordered w-full max-w-xs ml-3 h-8 mt-5 placeholder:text-secondary border-secondary"
                      />
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs mt-5 text-secondary file:bg-secondary file:border-secondary file:text-white"
                    />
                  </div>
                  <div className="container-btn-action flex items-center justify-between">
                    <div className="container-btn-submit mt-7">
                      <button
                        type="submit"
                        onClick={handleAdd}
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
