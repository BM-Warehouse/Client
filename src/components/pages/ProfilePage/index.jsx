'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import formatDate from '@/lib/formatBirthdate';
import useUsersStore from '@/store/userStore';

function ProfilePage() {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState(null);
  const { asyncGetDetail, asyncDestroyUser } = useUsersStore((state) => ({
    asyncGetDetail: state.asyncGetDetail,
    asyncDestroyUser: state.asyncDestroyUser
  }));

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('auth-user-storage'))?.state?.authUser;
    if (authUser) {
      setUserDetail(authUser);
      asyncGetDetail(authUser.id);
    } else {
      router.push('/login'); // Redirect to login if no user is found
    }
  }, [asyncGetDetail, router]);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  const handleDestroy = async () => {
    await asyncDestroyUser(userDetail.id);
    router.push('/');
  };

  return (
    <section className="profile-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="profile-page-content flex w-full flex-col items-center px-56 py-10 text-primary md:px-10">
        <div className="profile-container mt-20 flex flex-col items-center px-0 md:px-8 xl:px-24">
          <div className="profile-title mb-6 text-center">
            <h1 className="text-3xl font-bold text-tertiary">Profile</h1>
          </div>
          <figure className="w-[500px] h-[500px] p-2">
            <img
              src={userDetail.avatar}
              alt={userDetail.username}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="profile-body w-full px-6 pt-4">
            <div className="profile-description bg-tertiary border border-primary rounded-lg shadow-lg p-6">
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
                Edit Profile
              </button>
            </div>
            <div className="btn-delete mt-5">
              <button
                className="w-full bg-red-500 px-8 py-4 font-bold text-white hover:bg-red-600 rounded-lg h-11 text-sm"
                onClick={() => document.getElementById('my_modal_1').showModal()}
              >
                Delete Account
              </button>
            </div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-primary rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
                <p className="mb-4">Are you sure you want to delete this account?</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
