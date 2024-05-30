'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Loading from '@/components/parts/Loading';
import Navbar from '@/components/parts/Navbar';
import ProgressBar from '@/components/parts/ProgressBar';
import Sidebar from '@/components/parts/Sidebar';
import useInput from '@/hooks/useInput';
import { uploadV3 } from '@/lib/upload';
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
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  if (!role) {
    return <Loading />;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBack = async () => {
    router.back();
  };

  const handleProgressChange = (percentage) => {
    console.log(percentage);
    setProgress(percentage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !email ||
      !username ||
      !password ||
      !phone ||
      !address ||
      !gender ||
      !birthdate ||
      !roleUser
    ) {
      console.log(fullName, email, username, password, phone, address, gender, birthdate, roleUser);
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setIsUploading(true);
      // eslint-disable-next-line camelcase
      const { secure_url } = await uploadV3(file, handleProgressChange);
      // eslint-disable-next-line camelcase
      const avatar = secure_url;

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
        avatar
      });

      router.push(`/users`);
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
        <div className="add-user-container mt-10 md:mt-20 flex flex-col items-center bg-primary px-4 md:px-8 xl:px-24 rounded-lg shadow-lg py-10 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-secondary">Add User</h1>
          <form className="flex flex-col w-full">
            <div className="input-container flex flex-col space-y-3">
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
              {/* <div className='mt-72'>
              </div> */}
              <label className="text-secondary w-full">
                Email:
                <input
                  type="email"
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
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={onPhoneChange}
                  placeholder="Phone"
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Address:
                <textarea
                  type="text"
                  rows={3}
                  name="address"
                  value={address}
                  onChange={onAddressChange}
                  placeholder="Address"
                  className="textarea textarea-bordered w-full mt-2 placeholder:text-secondary rounded-md px-3"
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Avatar:
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-sm w-full mt-2 h-10 text-secondary file:bg-secondary file:border-secondary file:text-white rounded-md"
                />
              </label>
              {isUploading && <ProgressBar progress={progress} />}
            </div>
            <div className="modal-action mt-6 flex justify-between">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn bg-secondary text-white rounded-md px-4 py-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="btn bg-secondary text-white rounded-md px-4 py-2"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
