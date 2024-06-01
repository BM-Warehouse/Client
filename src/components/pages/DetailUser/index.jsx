'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/components/parts/Loading';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import formatDate from '@/lib/formatBirthdate';
import formatPhoneNumber from '@/lib/formatPhoneNumber';
import useUsersStore from '@/store/userStore';

function DetailUser({ params }) {
  const router = useRouter();
  const { userDetail, asyncGetDetail } = useUsersStore((state) => ({
    userDetail: state.userDetail,
    asyncGetDetail: state.asyncGetDetail
  }));
  const { asyncDestroyUser } = useUsersStore((state) => ({
    asyncDestroyUser: state.asyncDestroyUser
  }));
  const [isLoading, setLoading] = useState(true);

  const id = +params.userid;
  useEffect(() => {
    asyncGetDetail(id).then(() => {
      setLoading(false);
    });
  }, [asyncGetDetail, id]);

  if (!userDetail) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleDestroy = async () => {
    await asyncDestroyUser(id);
    router.back();
  };

  const handleUpdate = () => {
    router.push(`/users/${id}/edit`);
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <section className="detail-user-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="title-detailpage flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">User Detail</h1>
      </div>
      <div className="detail-user-page-content  w-full  mt-20 text-tertiary">
        <div className="detail-user-container">
          <div className="header-profile flex flex-col md:flex-row  justify-center items-center gap-9">
            <div className="avatar">
              <div className="w-56 rounded-full ring ring-primary hover:ring-secondary ring-offset-base-100 ring-offset-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={userDetail.username} src={userDetail.avatar} />
              </div>
            </div>
            <div className="header info text-tertiary flex flex-col gap-2 text-center md:text-left">
              <h4 className="font-bold text-2xl">{userDetail.fullName}</h4>
              <h5 className="font-semibold">@{userDetail.username}</h5>
              <h5>{userDetail.email}</h5>
            </div>
          </div>
          <div className="main-info ml-0 px-10 md:px-0  md:ml-40 mt-16">
            <div className="heading-main flex flex-col md:flex-row justify-evenly ">
              <h5 className="text-xl w-72 font-bold ">Personal Information</h5>
              <div className="w-72"> </div>
            </div>
            <div className="body-main ">
              <div className="body1 mt-5 flex flex-col md:flex-row  justify-evenly ">
                <div className="fullname w-72  ">
                  <h6 className="text-secondary">Full Name</h6>
                  <p className="font-semibold text-lg">{userDetail.fullName}</p>
                </div>
                <div className="username w-72 mt-5 md:mt-0">
                  <h6 className="text-secondary">Username</h6>
                  <p className="font-semibold text-lg">@{userDetail.username}</p>
                </div>
              </div>
              <div className="body2 mt-5 flex flex-col md:flex-row  justify-evenly ">
                <div className="email w-72">
                  <h6 className="text-secondary">Email Address</h6>
                  <p className="font-semibold text-lg">{userDetail.email}</p>
                </div>
                <div className="phone w-72  mt-5 md:mt-0">
                  <h6 className="text-secondary">Username</h6>
                  <p className="font-semibold text-lg">{formatPhoneNumber(userDetail.phone)}</p>
                </div>
              </div>
              <div className="body3 mt-5 flex flex-col md:flex-row justify-evenly">
                <div className="address w-72">
                  <h6 className="text-secondary">Address</h6>
                  <p className="font-semibold text-lg">{userDetail.address}</p>
                </div>
                <div className="gender w-72  mt-5 md:mt-0">
                  <h6 className="text-secondary ">Gender</h6>
                  <p className="font-semibold text-lg">{userDetail.gender}</p>
                </div>
              </div>
              <div className="body4 mt-5 flex flex-col md:flex-row justify-evenly">
                <div className="birthdate w-72">
                  <h6 className="text-secondary">Birthdate</h6>
                  <p className="font-semibold text-lg">{formatDate(userDetail.birthdate)}</p>
                </div>
                <div className="role w-72  mt-5 md:mt-0">
                  <h6 className="text-secondary">Role</h6>
                  <p className="font-semibold text-lg">{userDetail.role}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons-action mt-10 flex flex-col md:flex-row justify-center md:gap-16 xl:gap-28 gap-3 px-5 md:px-0 ">
            <div className="btn-edit mt-3 min-w-40 ">
              <button
                onClick={handleUpdate}
                className="btn bg-tertiary hover:bg-secondary w-full text-white"
              >
                Edit User
              </button>
            </div>
            <div className="btn-delete mt-3  min-w-40">
              <button
                className="btn w-full bg-red-500 font-bold text-white hover:bg-red-600 rounded-lg text-sm"
                onClick={() => document.getElementById('my_modal_1').showModal()}
              >
                Delete User
              </button>
            </div>
            <div className="btn-back mt-3  min-w-40">
              <button
                className="btn w-full bg-tertiary hover:bg-secondary text-white"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-primary rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
          <p className="mb-4">Are you sure you want to delete this user?</p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => document.getElementById('my_modal_1').close()}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleDestroy}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}

export default DetailUser;
