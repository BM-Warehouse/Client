import { BiPlus } from 'react-icons/bi';
import { IoFilterSharp } from 'react-icons/io5';

const Container = ({ children }) => (
  <div className="mx-4 mb-10 max-w-7xl md:mx-6 lg:mx-10 xl:mx-auto mt-32">
    <div className="flex justify-between flex-wrap mb-4">
      <button
        className="inline-flex items-center border border-gray-300 bg-tertiary text-white py-2 px-4 rounded 
      shadow-sm hover:bg-secondary mb-2"
      >
        <BiPlus className="mr-2 text-white" /> Add Warehouse
      </button>
      <div className="search-filter flex items-center justify-between">
        <label className="input  flex h-8 items-center gap-2 border-tertiary ">
          <input
            type="text"
            className="grow text-sm text-tertiary transition-none placeholder:text-secondary"
            placeholder="Search product..."
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
    <div className="mx-4 mb-10 max-w-7xl rounded-xl border border-secondary p-10 md:mx-6 lg:mx-10 xl:mx-auto">
      {children}
    </div>
  </div>
);

export default Container;
