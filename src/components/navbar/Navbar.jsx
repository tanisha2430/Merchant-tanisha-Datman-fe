import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import toast from 'react-hot-toast';
import { IoBusiness } from "react-icons/io5";
import { FaBell } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('auth'));
  }, [localStorage.getItem('auth')]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    toast.error('Logged out');
    navigate('/loginsignup'); 
  };

  return (
    <>
      <nav className="w-full flex bg-orange-50 flex-wrap justify-between items-center p-7 top-0 text-[#2e048f]">
        <Link to="/">
          <div className="flex">
            <IoBusiness className="text-orange-800 text-3xl" />
            <h2 className="text-orange-800 hidden sm:block font-bold ml-2 text-xl tracking-wider">Merchant Interactions</h2>
          </div>
        </Link>

        <button onClick={toggleNav} className="text-orange-800 md:hidden block focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto`}>
          <ul className="text-orange-800 mr-5 font-semibold md:flex flex-col space-y-5 md:space-y-0 md:flex-row gap-5 text-[18px] w-full md:w-auto">
            <li className='mt-10 md:mt-0'>
            <NavLink to="/" className={({ isActive }) => `${isActive ? 'underline text-orange-800' : 'text-orange-700'} hover:underline hover:border-white  cursor-pointer`}>
              Home
            </NavLink>
          </li>
            <li className='mt-5 md:mt-0'>
              <NavLink to="/" className={({ isActive }) => `${isActive ? 'underline text-orange-800' : 'text-orange-700'} hover:underline hover:border-white cursor-pointer `}>
                <FaBell className='h-5 w-5 mt-2 ml-5 mr-5' />
              </NavLink>
            </li>
           
           
            <li>
              <button
                onClick={handleLogout}
                className="bg-orange-800 p-2 border-2 border-white rounded-lg hover:bg-orange-700 text-white"
              >
                Logout
              </button>
            </li>

          </ul>
        </div>
      </nav>
      <hr className='font-bold' />
    </>
  );
}

export default Navbar;


