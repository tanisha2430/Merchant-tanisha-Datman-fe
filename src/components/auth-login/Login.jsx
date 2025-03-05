// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   // const {login}=useAuth()
//   const [credentials, setCredentials] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit =  (e) => {
//     e.preventDefault();
//     // await login(credentials)
//   };

//   const onHandleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
//   };

//   return (
//     <div className="flex flex-col md:flex-row bg-orange-100 items-center justify-center min-h-screen">
//       {/* Image Section */}
//       <div className="w-full md:w-1/2 flex justify-center">
//       <img className="max-h-[96vh] h-auto object-cover" src="login.png" alt="Auth Illustration" />
//       </div>

//       {/* Form Section */}
//       <div className="w-full md:w-1/2 flex justify-center">
//         <div className="w-full max-w-lg bg-white p-8">
//           <h2 className="text-2xl font-bold mb-6 text-center text-red-900">Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 onChange={onHandleChange}
//                 className="w-full px-3 py-2 border border-gray-300 text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 onChange={onHandleChange}
//                 className="w-full px-3 py-2 border border-gray-300 text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full mt-6 bg-blue-900 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
//             >
//               Login
//             </button>
//             <p className='mt-5 text-center'>
//               Not an existing user?
//               <Link to='/signup' className='text-pink-950 font-semibold p-2'>Signup</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { loginAgent } = useAuth(); // Use the loginAgent function from useAuth
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAgent(credentials.email, credentials.password); // Call loginAgent with credentials
  };

  const onHandleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex flex-col md:flex-row bg-orange-100 items-center justify-center min-h-screen">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img className="max-h-[96vh] h-auto object-cover" src="login.png" alt="Auth Illustration" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-900">Login</h2>
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
