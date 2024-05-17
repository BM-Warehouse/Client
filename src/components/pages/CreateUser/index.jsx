'use client';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

function CreateUser() {
  return (
    <section className="detail-user-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="detail-user-page-content flex w-full flex-col items-center px-4 md:px-10 py-10 text-primary">
        <div className="detail-user-container mt-10 md:mt-20 flex flex-col items-center bg-tertiary px-4 md:px-8 xl:px-24 rounded-lg shadow-lg py-10 w-full max-w-2xl">
          <form className="flex flex-col w-full">
            <div className="input-container space-y-4">
              <label className="text-secondary w-full">
                Name:
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Email:
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Username:
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full relative">
                Password:
                <div className="relative w-full">
                  <input
                    type="password"
                    placeholder=""
                    className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3 pr-10"
                  />
                </div>
              </label>
              <label className="text-secondary w-full">
                Phone:
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Address:
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Gender:
                <select className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white">
                  <option value="male" selected="male">
                    Male
                  </option>
                  <option value="female" selected="female">
                    Female
                  </option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Birthdate:
                <input
                  type="date"
                  defaultValue=""
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Role:
                <select className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white">
                  <option value="user" selected="user">
                    User
                  </option>
                  <option value="admin" selected="admin">
                    Admin
                  </option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Avatar:
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-sm w-full mt-2 text-secondary file:bg-secondary file:border-secondary file:text-white rounded-md px-3"
                />
              </label>
            </div>
            <div className="modal-action mt-6 flex justify-between">
              <button type="button" className="btn bg-secondary text-white rounded-md px-4 py-2">
                Close
              </button>
              <button type="submit" className="btn bg-secondary text-white rounded-md px-4 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateUser;
