'use client';

import { useEffect } from 'react';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import formatDate from '@/lib/formatBirthdate';
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

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  return (
    <section className="detail-user-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="detail-user-page-content flex w-full flex-col items-center px-56 py-10 text-primary md:px-10">
        <div className="detail-user-container mt-20 flex flex-col items-center px-0 md:px-8 xl:px-24">
          <div className="detail-title mb-6 text-center">
            <h1 className="text-3xl font-bold text-tertiary">User Detail</h1>
          </div>
          <figure className="w-[500px] h-[500px] p-2">
            <img
              src={userDetail.avatar}
              alt={userDetail.username}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="detail-body w-full px-6 pt-4">
            <div className="detail-description bg-tertiary border border-primary rounded-lg shadow-lg p-6">
              <p className="mb-3 text-base">Name : {userDetail.fullName}</p>
              <p className="mb-3 text-base">Email: {userDetail.email}</p>
              <p className="mb-3 text-base">Username : {userDetail.username}</p>
              <p className="mb-3 text-base">Password : {userDetail.password}</p>
              <p className="mb-3 text-base">Phone : {userDetail.phone}</p>
              <p className="mb-3 text-base">Address: {userDetail.address}</p>
              <p className="mb-3 text-base">Gender : {userDetail.gender}</p>
              <p className="mb-3 text-base">Birthdate: {formatDate(userDetail.birthdate)}</p>
              <p className="mb-3 text-base">Role: {userDetail.role}</p>
            </div>
            <div className="btn-edit mt-5">
              <button className="btn bg-tertiary hover:bg-secondary text-white w-full">
                Edit User
              </button>
            </div>
            <div className="btn-delete mt-5">
              <button className="w-full bg-red-500 px-8 py-4 font-bold text-white hover:bg-red-600 rounded-lg h-11 text-sm">
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailUser;
