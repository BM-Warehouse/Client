'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import useInput from '@/hooks/useInput';
import useAuthUserStore from '@/store/authUserStore';
import useUsersStore from '@/store/userStore';

function UpdateUser({ params }) {
  const { role } = useAuthUserStore();
  const { userDetail, asyncGetDetail, asyncUpdateUser } = useUsersStore((state) => ({
    userDetail: state.userDetail,
    asyncGetDetail: state.asyncGetDetail,
    asyncUpdateUser: state.asyncUpdateUser
  }));

  const router = useRouter();

  const handleBack = async () => {
    router.back();
  };

  const id = +params.userid;

  useEffect(() => {
    asyncGetDetail(id);
  }, [asyncGetDetail, id]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, onEmailChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [fullName, onfullNameChange] = useInput('');
  const [phone, onPhoneChange] = useInput('');
  const [address, onAddressChange] = useInput('');
  const [gender, onGenderChange] = useInput('');
  const [birthdate, onBirthdateChange] = useInput('');
  const [roleUser, onRoleChange] = useInput('');
  const [file, setFile] = useState(null);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push(`/users/${id}`);

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rwheysjo');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/denyah3ls/image/upload', {
        method: 'POST',
        body: formData
      });

      const { secureUrl } = await response.json();

      const imageUrl = secureUrl;

      await asyncUpdateUser(id, {
        email,
        username,
        password,
        fullName,
        phone,
        address,
        gender,
        birthdate,
        role: roleUser,
        avatar: imageUrl
      });
      alert('User edited successfully!');
    } catch (error) {
      console.log(`user edited failed: ${error}`);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!role) {
    return null;
  }

  return (
    <section className="update-user-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="update-user-page-content flex w-full flex-col items-center px-4 md:px-10 py-10 text-primary">
        <div className="update-user-container mt-10 md:mt-20 flex flex-col items-center bg-tertiary px-4 md:px-8 xl:px-24 rounded-lg shadow-lg py-10 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">Update User</h1>
          <form className="flex flex-col w-full">
            <div className="input-container space-y-4">
              <label className="text-secondary w-full">
                Name:
                <input
                  type="text"
                  defaultValue={userDetail.fullName}
                  onChange={onfullNameChange}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Email:
                <input
                  type="text"
                  defaultValue={userDetail.email}
                  onChange={onEmailChange}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Username:
                <input
                  type="text"
                  defaultValue={userDetail.username}
                  onChange={onUsernameChange}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full relative">
                Password:
                <div className="relative w-full">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="******"
                    onChange={onPasswordChange}
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
                  onChange={onPhoneChange}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Address:
                <input
                  type="text"
                  placeholder={userDetail.address}
                  onChange={onAddressChange}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Gender:
                <select
                  className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white"
                  value={gender}
                  onChange={onGenderChange}
                >
                  <option value="">Select Gender</option>
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
                  onChange={onBirthdateChange}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Role:
                <select
                  className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white"
                  value={roleUser}
                  onChange={onRoleChange}
                >
                  <option value="">Select Role</option>
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
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-sm w-full mt-2 text-secondary file:bg-secondary file:border-secondary file:text-white rounded-md px-3"
                />
              </label>
            </div>
            <div className="modal-action mt-6 flex justify-between">
              <button
                type="button"
                className="btn bg-secondary text-white rounded-md px-4 py-2"
                onClick={handleBack}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn bg-secondary text-white rounded-md px-4 py-2"
                onClick={handleSubmit}
              >
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
