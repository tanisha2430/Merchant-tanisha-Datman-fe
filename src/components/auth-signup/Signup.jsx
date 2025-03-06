import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { IoBusiness } from "react-icons/io5";


const Signup = () => {

  const { registerAgent } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      return alert("Passwords do not match");
    }
    await registerAgent({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });
  };

  const onHandleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex flex-col md:flex-row bg-orange-100 items-center justify-center min-h-screen">
    
    <div className="w-full ml-3 mr-3 md:w-1/2 flex justify-center">
        <img className="md:h-96 h-auto object-cover" src="signup.png" alt="Auth Illustration" />
      </div>

    
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8">
          <div className='mb-10'>
                     <h1 className=' text-blue-900 sm:text-xl mb-5 font-bold'>Start your journey!</h1>
                     <div className='flex text-orange-900 text-3xl '>
         <IoBusiness/>
                     <h2 className='text-xl ml-2 text-orange-900 sm:text-2xl font-bold'>Merchant Interactions.</h2>
                     </div>
                   <h2 className="mt-2 font-medium text-black">Sign Up to Manage Tasks, Track Interactions, and Grow Seamlessly. </h2>
                   </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="username"
                onChange={onHandleChange}
                placeholder="Enter Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-red-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                onChange={onHandleChange}
                placeholder="Enter Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-red-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={onHandleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-red-900"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                placeholder="Enter Confirm Password"
                onChange={onHandleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900 text-red-900"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              Signup
            </button>
            <p className="mt-5 text-center">
              Already a user?
              <Link to="/loginsignup" className="text-pink-950 font-semibold p-2">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
