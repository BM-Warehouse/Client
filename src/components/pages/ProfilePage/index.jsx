'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/components/parts/Loading';
import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import formatDate from '@/lib/formatBirthdate';
import formatPhoneNumber from '@/lib/formatPhoneNumber';
import useUsersStore from '@/store/userStore';

function ProfilePage() {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState(null);
  const { asyncGetDetail } = useUsersStore((state) => ({
    asyncGetDetail: state.asyncGetDetail
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
    return <Loading />;
  }

  const handleUpdate = () => {
    router.push(`/users/${userDetail.id}/edit`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="profile-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="title-profilepage flex justify-center pt-24">
        <h1 className="text-4xl font-semibold text-tertiary xl:font-bold">Profile</h1>
      </div>
      <div className="profile-page-content ww-full  mt-20 text-tertiary">
        <div className="profile-container ">
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
    </section>
  );
}

export default ProfilePage;
