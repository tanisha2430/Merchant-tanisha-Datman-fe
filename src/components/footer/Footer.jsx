import React from 'react';
import { IoBusiness } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <footer className='text-center bg-orange-200 text-orange-900 p-5'>
        <div className='flex flex-col justify-center items-center p-5 '>
          <div className='flex items-center gap-2 mb-5'>
            <IoBusiness className='text-3xl' />
            <h1 className='text-2xl font-bold'>Merchant Interactions</h1>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-center gap-4 text-center'>
            <p className='text-lg'>
              📧 <a href='mailto:your.email@example.com' className='text-black hover:underline'>tanishasaxena2412@gmail.com</a>
            </p>
            <p className='text-lg text-black'>
              📍 <span>Bareilly, UP, India</span>
            </p>
            <p className='text-lg text-black'>
              🔗 <a href='https://www.linkedin.com/in/tanishasaxena2412' target='_blank' rel='noopener noreferrer' className='text-black hover:underline'>LinkedIn</a>
            </p>
            <p className='text-lg text-black'>
              🐙 <a href='https://github.com/Tanishasaxena24' target='_blank' rel='noopener noreferrer' className='text-black hover:underline'>GitHub</a>
            </p>
            <p className='text-lg text-black'>
              🌐 <a href='https://tanisha-saxena-portfolio.netlify.app/' target='_blank' rel='noopener noreferrer' className='text-black hover:underline'>Portfolio</a>
            </p>
          </div>

        </div>
      </footer>

      <div className='bg-blue-900 text-center text-sm sm:text-base  space-y-1 text-white p-3'>
        <p>&copy; 2025 Merchants-Interactions and Tasks. All rights reserved.</p>
        <p>Designed and developed by " Tanisha Saxena"</p>
      </div>
    </>
  );
};

export default Footer;
