'use client';

import { useEffect, useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import useUsersStore from '@/store/userStore';

function DetailUser({ params }) {
  const { userDetail, asyncGetDetail } = useUsersStore((state) => ({
    userDetail: state.userDetail,
    asyncGetDetail: state.asyncGetDetail
  }));

  const id = +params.userid;
  useEffect(() => {
    asyncGetDetail(id);
  }, [asyncGetDetail, id]);

  const [passwordVisible, setPasswordVisible] = useState(false);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
                  placeholder={userDetail.fullName}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Email:
                <input
                  type="text"
                  placeholder={userDetail.email}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Username:
                <input
                  type="text"
                  placeholder={userDetail.username}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full relative">
                Password:
                <div className="relative w-full">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="******"
                    className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </label>
              <label className="text-secondary w-full">
                Phone:
                <input
                  type="text"
                  placeholder={userDetail.phone}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Address:
                <input
                  type="text"
                  placeholder={userDetail.address}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Gender:
                <select className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white">
                  <option value="male" selected={userDetail.gender === 'male'}>
                    Male
                  </option>
                  <option value="female" selected={userDetail.gender === 'female'}>
                    Female
                  </option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Birthdate:
                <input
                  type="date"
                  defaultValue={userDetail.birthdate}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Role:
                <select className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white">
                  <option value="user" selected={userDetail.role === 'user'}>
                    User
                  </option>
                  <option value="admin" selected={userDetail.role === 'admin'}>
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

export default DetailUser;
