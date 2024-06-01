'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Loading from '@/components/parts/Loading';
import Navbar from '@/components/parts/Navbar';
import ProgressBar from '@/components/parts/ProgressBar';
import Sidebar from '@/components/parts/Sidebar';
import { uploadV3 } from '@/lib/upload';
import useAuthUserStore from '@/store/authUserStore';
import useUsersStore from '@/store/userStore';

function UpdateUser({ params }) {
  const { role } = useAuthUserStore();
  const { userDetail, asyncGetDetail, asyncUpdateUser } = useUsersStore((state) => ({
    userDetail: state.userDetail,
    asyncGetDetail: state.asyncGetDetail,
    asyncUpdateUser: state.asyncUpdateUser
  }));
  const [birthDate, setBirthDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const handleBack = async () => {
    router.back('/users');
  };

  const handleProgressChange = (percentage) => {
    setProgress(percentage);
  };

  const id = +params.userid;

  useEffect(() => {
    asyncGetDetail(id).then(() => {
      setLoading(false);
    });
  }, [asyncGetDetail, id]);

  useEffect(() => {
    if (userDetail) {
      setBirthDate(userDetail.birthdate.split('T')[0]);
    }
  }, [userDetail]);

  const [passwordVisible, setPasswordVisible] = useState(false);

  if (!userDetail) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);
    const form = new FormData(e.target);
    const name = form.get('name');
    const email = form.get('email');
    const username = form.get('username');
    const password = form.get('password');
    const phone = form.get('phone');
    const address = form.get('address');
    const gender = form.get('gender');
    const birthdate = form.get('birthdate');
    const role = form.get('role');
    const avatar = form.get('avatar');
    let imageUrl = null;

    try {
      if (avatar.size !== 0) {
        // eslint-disable-next-line camelcase
        const { secure_url } = await uploadV3(avatar, handleProgressChange);
        // eslint-disable-next-line camelcase
        imageUrl = secure_url;
      }

      await asyncUpdateUser(id, {
        email,
        username,
        password,
        name,
        phone,
        address,
        gender,
        birthdate,
        role,
        avatar: imageUrl
      });
      toast.success('User edited successfully!');
      router.push(`/users/${id}`);
    } catch (error) {
      console.log(`user edited failed: ${error}`);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!role) {
    return <Loading />;
  }

  return (
    <section className="update-user-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="update-user-page-content flex w-full flex-col items-center px-4 md:px-10 py-10 text-primary">
        <div className="update-user-container mt-10 md:mt-20 flex flex-col items-center bg-primary px-4 md:px-8 xl:px-24 rounded-lg shadow-lg py-10 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-secondary mb-6">Update User</h1>
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="input-container flex flex-col space-y-4">
              <label className="text-secondary w-full">
                Name:
                <input
                  name="name"
                  type="text"
                  defaultValue={userDetail.fullName}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Email:
                <input
                  name="email"
                  type="email"
                  defaultValue={userDetail.email}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Username:
                <input
                  name="username"
                  type="text"
                  defaultValue={userDetail.username}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full relative">
                Password:
                <div className="relative w-full">
                  <input
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3 pr-10"
                    placeholder="Let it empty if you do not want to change your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </label>
              <label className="text-secondary w-full">
                Phone:
                <input
                  name="phone"
                  type="tel"
                  defaultValue={userDetail.phone}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Address:
                <textarea
                  name="address"
                  rows={3}
                  type="text"
                  defaultValue={userDetail.address}
                  className="textarea textarea-bordered w-full mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Gender:
                <select
                  name="gender"
                  className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white"
                  defaultValue={userDetail.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Birthdate:
                <input
                  name="birthdate"
                  type="date"
                  defaultValue={birthDate}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Role:
                <select
                  name="role"
                  className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white"
                  defaultValue={userDetail.role}
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Avatar:
                <input
                  name="avatar"
                  type="file"
                  className="file-input file-input-bordered h-10 file-input-sm w-full mt-2 text-secondary file:bg-secondary file:border-secondary file:text-white rounded-md"
                />
              </label>
              {isUploading && <ProgressBar progress={progress} />}
            </div>
            <div className="modal-action mt-6 flex justify-between">
              <button
                type="button"
                className="btn bg-secondary text-white rounded-md px-4 py-2"
                onClick={handleBack}
              >
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

export default UpdateUser;
