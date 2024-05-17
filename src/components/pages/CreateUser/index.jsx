'use client';

import { useState, useEffect } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Navbar from '@/components/parts/Navbar';
import Sidebar from '@/components/parts/Sidebar';

const AddUser = ({ user, onSave }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');
  const [gender, setgender] = useState('');
  const [birthdate, setbirthdate] = useState('');
  const [role, setrole] = useState('');
  const [avatar, setavatar] = useState('');

  useEffect(() => {
    if (user) {
      setfullName(user.fullName);
      setemail(user.email);
      setusername(user.username);
      setpassword(user.password);
      setphone(user.phone);
      setaddress(user.address);
      setgender(user.gender);
      setbirthdate(user.birthdate);
      setrole(user.role);
      setavatar(user.avatar);
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangeAvatar = (e) => {
    // const { files } = e.target;
    setavatar({
      // [avatar]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...user,
      fullName,
      email,
      username,
      password,
      phone,
      address,
      gender,
      birthdate,
      role,
      avatar
    });
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
                  onChange={(e) => setfullName(e.target.value)}
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
                  onChange={(e) => setemail(e.target.value)}
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
                  onChange={(e) => setusername(e.target.value)}
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
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
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
                  name="phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
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
                  onChange={(e) => setaddress(e.target.value)}
                  placeholder="Address"
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Gender:
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white"
                >
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
                  onChange={(e) => setbirthdate(e.target.value)}
                  className="input input-bordered w-full h-10 mt-2 placeholder:text-secondary rounded-md px-3"
                />
              </label>
              <label className="text-secondary w-full">
                Role:
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                  className="input input-bordered w-full h-10 mt-2 rounded-md px-3 text-secondary bg-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <label className="text-secondary w-full">
                Avatar:
                <input
                  type="file"
                  name="avatar"
                  onChange={handleChangeAvatar}
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
};

export default AddUser;
