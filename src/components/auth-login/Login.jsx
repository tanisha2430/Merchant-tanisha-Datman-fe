import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { IoBusiness } from "react-icons/io5";


const Login = () => {

  const { loginAgent } = useAuth(); 
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAgent(credentials.email, credentials.password); 
  };

  const onHandleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex flex-col md:flex-row bg-orange-100 items-center  justify-center min-h-screen">
    
      <div className="w-full ml-3 mr-3 md:w-1/2 flex justify-center">
        <img className="md:h-96 h-auto object-cover" src="signup.png" alt="Auth Illustration" />
      </div>

   
      <div className="w-full mr-10 ml-10 md:w-1/2 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8">
          <div className='mb-10'>
            <h1 className='text-xl text-blue-900 sm:text-3xl mb-5 font-bold'>Welcome Back!</h1>
            <div className='flex text-orange-900 text-3xl '>
<IoBusiness/>
            <h2 className='text-xl ml-2 text-orange-900 sm:text-2xl font-bold'>Merchant Interactions.</h2>
            </div>
          <h2 className="mt-2 font-medium text-black">Please enter your credentials to access your account.</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={onHandleChange}
                className="w-full px-3 py-2 border border-gray-300 text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={onHandleChange}
                className="w-full px-3 py-2 border border-gray-300 text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-900 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              Login
            </button>
            <p className='mt-5 text-center'>
              Not an existing user?
              <Link to='/signup' className='text-pink-950 font-semibold p-2'>Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
