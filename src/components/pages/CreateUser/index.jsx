'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';
import useInput from '@/hooks/useInput';
import useAuthUserStore from '@/store/authUserStore';
import useUsersStore from '@/store/userStore';

const AddUser = () => {
  const { role } = useAuthUserStore();

  const [fullName, onfullNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [phone, onPhoneChange] = useInput('');
  const [address, onAddressChange] = useInput('');
  const [gender, onGenderChange] = useInput('');
  const [birthdate, onBirthdateChange] = useInput('');
  const [roleUser, onRoleChange] = useInput('');
  const [file, setFile] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { asyncAddUser } = useUsersStore();
  const router = useRouter();

  if (!role) {
    return null;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBack = async () => {
    router.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
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
      console.log(imageUrl);

      await asyncAddUser({
        fullName,
        email,
        username,
        password,
        phone,
        address,
        gender,
        birthdate,
        role: roleUser,
        avatar: imageUrl
      });
    } catch (error) {
      console.log(`User added failed: ${error}`);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="add-user-page relative min-h-screen bg-bgColor pb-20 font-poppins">
      <Navbar />
      <Sidebar />
      <div className="add-user-page-content flex w-full flex-col items-center px-4 md:px-10 py-10 text-primary">
        <div className="add-user-container mt-10 md:mt-20 flex flex-col items-center bg-tertiary px-4 md:px-8 xl:px-24 rounded-lg shadow-lg py-10 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6">Add User</h1>
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="input-container space-y-4">
              <label className="text-secondary w-full">
                Name:
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={onfullNameChange}
                  placeholder="Full Name"
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Email:
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onEmailChange}
                  placeholder="Email"
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Username:
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={onUsernameChange}
                  placeholder="Username"
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full relative">
                Password:
                <div className="relative w-full">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={onPasswordChange}
                    placeholder="Password"
                    className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3 pr-10"
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
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={onPhoneChange}
                  placeholder="Phone"
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Address:
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={onAddressChange}
                  placeholder="Address"
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Gender:
                <select
                  name="gender"
                  value={gender}
                  onChange={onGenderChange}
                  className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male" selected={gender === 'male'}>
                    Male
                  </option>
                  <option value="female" selected={gender === 'female'}>
                    Female
                  </option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Birthdate:
                <input
                  type="date"
                  name="birthdate"
                  value={birthdate}
                  onChange={onBirthdateChange}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Role:
                <select
                  name="role"
                  value={roleUser}
                  onChange={onRoleChange}
                  className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white"
                >
                  <option value="">Select Role</option>
                  <option value="user" selected={roleUser === 'user'}>
                    User
                  </option>
                  <option value="admin" selected={roleUser === 'admin'}>
                    Admin
                  </option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Avatar:
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-sm w-full mt-2 text-secondary file:bg-secondary file:border-secondary file:text-white rounded-md px-3"
                />
              </label>
            </div>
            <div className="modal-action mt-6 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="btn bg-secondary text-white rounded-md px-4 py-2"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn bg-secondary text-white rounded-md px-4 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
